"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "@components/ui/toaster";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:9859";

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
      console.log("Socket connected successfully:", socketInstance.id);
      socketInstance.emit("join", { id: userId, type: "user" });
    });

    // Request sent confirmation
    socketInstance.on("chatRequestSent", () => {
      setIsWaiting(true);
      toast.info("Chat request bhej di gayi hai. Astrologer ke accept karne ka intezaar karein...");
    });

    socketInstance.on("chatRequestFailed", (data: any) => {
      setIsWaiting(false);
      toast.error(data?.message || "Chat request fail ho gayi.");
    });

    socketInstance.on("chatRequestRejected", (data: any) => {
      setIsWaiting(false);
      toast.error(data?.message || "Astrologer ne chat request decline kar di.");
    });

    socketInstance.on("chatRequestDisconnected", () => {
      setIsWaiting(false);
      toast.error("Astrologer ne respond nahi kiya. Kripya thodi der baad koshish karein.");
    });

    // ✅ FIXED: Backend emits 'chatRequestAccepted' to the USER
    const handleSessionStart = (data: any) => {
      setIsWaiting(false);
      setActiveSession(data);
      toast.success("Astrologer ne request accept kar li! Chat shuru ho rahi hai.");
    };

    socketInstance.on("chatRequestAccepted", handleSessionStart);
    socketInstance.on("chatSessionStarted", handleSessionStart);

    // End session listener
    socketInstance.on("chatSessionEnded", (data: any) => {
      setActiveSession(null);
      setIsWaiting(false);
      toast.info(data?.reason || "Chat session samapt ho gaya hai.");
    });

    socketInstance.on("error", (err: any) => {
      toast.error(err?.message || "Socket error aaya hai.");
      setIsWaiting(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  const sendChatRequest = (astrologerId: string, customUserId?: string) => {
    const activeUid = customUserId || userId;
    if (!activeUid) {
      toast.error("Kripya pehle login karein chat shuru karne ke liye.");
      return;
    }
    setIsWaiting(true);
    if (!socket) {
      // Connect on demand if not connected yet
      const socketInstance = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        withCredentials: true,
      });
      socketInstance.on("connect", () => {
        socketInstance.emit("join", { id: activeUid, type: "user" });
        socketInstance.emit("sendChatRequest", {
          userId: activeUid,
          astrologerId,
          memberData: [],
          palmDocumentId: null,
        });
      });
      setSocket(socketInstance);
      return;
    }

    socket.emit("sendChatRequest", {
      userId: activeUid,
      astrologerId,
      memberData: [],
      palmDocumentId: null,
    });
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
      reason: "User ne chat band ki",
    });
    setActiveSession(null);
    setIsWaiting(false);
  };

  return { socket, activeSession, isWaiting, sendChatRequest, cancelWaiting, endChat };
}