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

export function useChatSocket(userId: string | null) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [activeSession, setActiveSession] = useState<any>(null);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const socketInstance = io(SOCKET_URL, {
            transports: ["websocket", "polling"],
            withCredentials: true,
        });

        socketInstance.on("connect", () => {
            console.log("%c🚀 [Socket] Connected successfully, Socket ID:", "color: #10b981; font-weight: bold;", socketInstance.id);
            console.log("➡️ [Socket] Emitting 'join' as user:", userId);
            socketInstance.emit("join", { id: userId, type: "user" });
        });

        socketInstance.on("joinSuccess", (data) => {
            console.log("%c✅ [Socket] Join Success:", "color: #10b981; font-weight: bold;", data);
        });

        // Request sent confirmation
        socketInstance.on("chatRequestSent", (data) => {
            console.log("%c📤 [Socket] Request Delivered to Backend & Astrologer:", "color: #3b82f6; font-weight: bold;", data);
            setIsWaiting(true);
            toast.info("Chat request sent. Please wait while the astrologer accepts your session...");
        });

        socketInstance.on("chatRequestFailed", (data: any) => {
            console.warn("⚠️ [Socket] chatRequestFailed:", data);
            setIsWaiting(false);
            toast.error(data?.message || "Unable to send chat request. Please try again.");
        });

        socketInstance.on("chatRequestRejected", (data: any) => {
            console.warn("❌ [Socket] chatRequestRejected:", data);
            setIsWaiting(false);
            toast.error(data?.message || "The astrologer has declined the chat request.");
        });

        socketInstance.on("chatRequestDisconnected", () => {
            console.warn("🔌 [Socket] chatRequestDisconnected");
            setIsWaiting(false);
            toast.error("The astrologer did not respond. Please try again in a moment.");
        });

        // ✅ FIXED: Backend emits 'chatRequestAccepted' to the USER
        const handleSessionStart = (data: any) => {
            console.log("%c🎉 [Socket] Chat Accepted / Session Started:", "color: #10b981; font-weight: bold;", data);
            setIsWaiting(false);
            setActiveSession(data);
            toast.success("Chat request accepted! Initializing session...");
        };

        socketInstance.on("chatRequestAccepted", handleSessionStart);
        socketInstance.on("chatSessionStarted", handleSessionStart);

        // End session listener
        socketInstance.on("chatSessionEnded", (data: any) => {
            console.log("🛑 [Socket] Chat Session Ended:", data);
            setActiveSession(null);
            setIsWaiting(false);
            toast.info(data?.reason || "The chat session has ended.");
        });

        socketInstance.on("error", (err: any) => {
            console.error("❌ [Socket] Error received from server:", err);
            toast.error(err?.message || "A connection error occurred.");
            setIsWaiting(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [userId]);

    const sendChatRequest = (
        astrologerId: string,
        customUserId?: string,
        customUserData?: any
    ) => {
        const activeUid = customUserId || userId;
        if (!activeUid) {
            toast.error("Please login first to initiate a chat consultation.");
            return;
        }

        const userName =
            typeof customUserData === "string"
                ? customUserData
                : customUserData?.name || "Client";

        const userGender =
            customUserData?.gender &&
            ["male", "female", "other"].includes(customUserData.gender.toLowerCase())
                ? customUserData.gender.toLowerCase()
                : "male";

        setIsWaiting(true);

        const payload = {
            userId: activeUid,
            astrologerId,
            memberData: [
                {
                    name: userName,
                    gender: userGender,
                    dob: customUserData?.dob || "2000-01-01",
                    birthTime: customUserData?.birthTime || "12:00",
                    placeOfBirth: customUserData?.placeOfBirth || "New Delhi",
                    latitude: "",
                    longitude: "",
                },
            ],
            palmDocumentId: null,
        };

        console.log("📤 [Socket] Emitting 'sendChatRequest' with payload:", payload);

        if (!socket) {
            const socketInstance = io(SOCKET_URL, {
                transports: ["websocket", "polling"],
                withCredentials: true,
            });
            socketInstance.on("connect", () => {
                console.log("🚀 [Socket] Connected on-demand. Emitting join & sendChatRequest...");
                socketInstance.emit("join", { id: activeUid, type: "user" });
                socketInstance.emit("sendChatRequest", payload);
            });
            setSocket(socketInstance);
            return;
        }

        socket.emit("sendChatRequest", payload);
    };

    const cancelWaiting = () => {
        setIsWaiting(false);
    };

    const endChat = (chatSessionId: string) => {
        if (!socket || !userId) return;
        socket.emit("endChatSession", {
            chatSessionId,
            userId,
            userType: "user",
            reason: "Session ended by user",
        });
        setActiveSession(null);
        setIsWaiting(false);
    };

    return { socket, activeSession, isWaiting, sendChatRequest, cancelWaiting, endChat };
}