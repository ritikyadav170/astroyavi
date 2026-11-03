"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "@components/ui/toaster";

const getSocketUrl = () => {
    const envUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://160.187.87.138:9859/api/";
    return envUrl.replace(/\/api(?:\/user)?\/?$/, "").replace(/\/+$/, "");
};

const SOCKET_URL = getSocketUrl();

export function useAstrologerSocket(astrologerId: string | null) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [incomingRequest, setIncomingRequest] = useState<any>(null);
    const [activeSession, setActiveSession] = useState<any>(null);

    useEffect(() => {
        if (!astrologerId) return;

        // Initialize socket connection
        const socketInstance = io(SOCKET_URL, {
            transports: ["websocket", "polling"],
            withCredentials: true,
        });

        socketInstance.on("connect", () => {
            console.log("Astrologer Socket connected:", socketInstance.id);
            // Register astrologer in backend Redis pool
            socketInstance.emit("join", { id: astrologerId, type: "astrologer" });
        });

        // 1. Listen for new chat requests from users
        socketInstance.on("chatRequestReceived", (data) => {
            console.log("New Request Received:", data);
            setIncomingRequest(data);
            toast.info(`New Chat Request from ${data.userName || "Client"}`);
        });

        // 2. Listen for user disconnecting/canceling the request before acceptance
        socketInstance.on("chatRequestDisconnected", () => {
            setIncomingRequest(null);
            toast.error("The user has canceled the chat request.");
        });

        // 3. Listen for the session officially starting (After Astrologer Accepts)
        const handleSessionStart = (data: any) => {
            setIncomingRequest(null);
            setActiveSession(data);
            toast.success("Chat session is now live with the user.");
        };

        socketInstance.on("chatSessionStarted", handleSessionStart);
        socketInstance.on("whatsappChatSessionStarted", handleSessionStart); // Fallback for whatsapp flow

        // 4. Listen for session ending (Timeout, User ended, or Auto-disconnect)
        socketInstance.on("chatSessionEnded", (data) => {
            setActiveSession(null);
            toast.info(data?.reason || "The chat session has ended.");
        });

        // 5. Handle Socket Errors
        socketInstance.on("error", (err) => {
            console.error("Socket Error:", err);
            toast.error(err?.message || "A socket error occurred.");
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [astrologerId]);

    // Function to Accept or Reject the incoming chat request
    const respondToRequest = (action: "accept" | "reject") => {
        if (!socket || !incomingRequest) return;

        socket.emit("respondChatRequest", {
            chatRequestId: incomingRequest.chatRequestId,
            astrologerId,
            userId: incomingRequest.userId,
            action: action, // "accept" or "reject"
            appState: "active"
        });

        if (action === "reject") {
            setIncomingRequest(null);
            toast.info("You rejected the chat request.");
        }
    };

    // Function for the Astrologer to manually end the active chat session
    const endChat = (chatSessionId: string) => {
        if (!socket || !astrologerId) return;

        socket.emit("endChatSession", {
            chatSessionId,
            userId: astrologerId, // Sending Astrologer's ID
            userType: "astrologer", // Ensures backend knows who ended it
            reason: "Astrologer ended the chat session",
        });

        setActiveSession(null);
    };

    return {
        socket,
        incomingRequest,
        activeSession,
        respondToRequest,
        endChat
    };
}