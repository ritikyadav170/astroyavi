"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "@components/ui/toaster";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:9859";

export function useAstrologerSocket(astrologerId: string | null) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [incomingRequest, setIncomingRequest] = useState<any>(null);
  const [activeSession, setActiveSession] = useState<any>(null);

  useEffect(() => {
    if (!astrologerId) return;

    const socketInstance = io(SOCKET_URL, { transports: ["websocket"] });

    socketInstance.on("connect", () => {
      // Astrologer joins the socket pool
      socketInstance.emit("join", { id: astrologerId, type: "astrologer" });
    });

    // 1. Listen for new chat requests from users
    socketInstance.on("chatRequestReceived", (data) => {
      setIncomingRequest(data);
      // Play a ringtone or show a modal here
      toast.info(`New Chat Request from ${data.userName || "Client"}`);
    });

    // 2. Listen for the session officially starting
    socketInstance.on("chatSessionStarted", (data) => {
      setIncomingRequest(null);
      setActiveSession(data);
      toast.success("Chat session is now live!");
    });

    // 3. Listen for session ending
    socketInstance.on("chatSessionEnded", (data) => {
      setActiveSession(null);
      toast.info(data.reason || "Session has ended.");
    });

    setSocket(socketInstance);
    return () => { socketInstance.disconnect(); };
  }, [astrologerId]);

  // Function to accept or reject
  const respondToRequest = (action: "accept" | "reject") => {
    if (!socket || !incomingRequest) return;
    
    socket.emit("respondChatRequest", {
      chatRequestId: incomingRequest.chatRequestId,
      astrologerId,
      userId: incomingRequest.userId,
      action: action, // "accept" or "reject"
      appState: "active"
    });

    if (action === "reject") setIncomingRequest(null);
  };

  return { socket, incomingRequest, activeSession, respondToRequest };
}