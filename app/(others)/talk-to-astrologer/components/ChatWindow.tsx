"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Clock, User as UserIcon } from "lucide-react";
import { Socket } from "socket.io-client";
import { formatImageUrl } from "@/lib/utils";

interface ChatWindowProps {
    socket: Socket;
    session: {
        chatSessionId: string;
        maxWaitingTime: number; // in seconds
        isFree?: boolean;
        freeMinutes?: number;
        price?: number;
    };
    astrologer: any;
    userId: string;
    userType?: "User" | "Astrologer"; // Defaults to User
    onClose: () => void;
}

interface MessageItem {
    _id?: string;
    sender?: any;
    senderModel?: string;
    messageText?: string;
    message?: string;
    timestamp?: string | Date;
}

export function ChatWindow({
    socket,
    session,
    astrologer,
    userId,
    userType = "User",
    onClose,
}: ChatWindowProps) {
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(
        session?.maxWaitingTime || 0
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Countdown Timer based on balance
    useEffect(() => {
        if (remainingSeconds <= 0) return;

        const timer = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    socket.emit("timeExpired", {
                        chatSessionId: session.chatSessionId,
                        userId,
                        userType: userType.toLowerCase(),
                    });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingSeconds, session.chatSessionId, socket, userId, userType]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (msg: MessageItem) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("newMessage", handleNewMessage);
        socket.on("messageSent", handleNewMessage);

        socket.on("userTyping", () => setIsTyping(true));
        socket.on("userStoppedTyping", () => setIsTyping(false));

        socket.on("chatSessionPaused", (data: any) => {
            if (typeof data?.maxWaitingTime === "number") {
                setRemainingSeconds(data.maxWaitingTime);
            }
        });

        socket.on("chatSessionResumed", (data: any) => {
            if (typeof data?.maxWaitingTime === "number") {
                setRemainingSeconds(data.maxWaitingTime);
            }
        });

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("messageSent", handleNewMessage);
            socket.off("userTyping");
            socket.off("userStoppedTyping");
            socket.off("chatSessionPaused");
            socket.off("chatSessionResumed");
        };
    }, [socket]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        if (!socket) return;

        const targetId = astrologer?.id || astrologer?._id;
        socket.emit("typing", {
            senderId: userId,
            recipientId: targetId,
            senderType: userType.toLowerCase(),
        });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stopTyping", {
                senderId: userId,
                recipientId: targetId,
                senderType: userType.toLowerCase(),
            });
        }, 1500);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text || !socket) return;

        socket.emit("sendMessage", {
            chatSessionId: session.chatSessionId,
            senderId: userId,
            senderType: userType, // Correct dynamically ("User" or "Astrologer")
            messageText: text,
            sessionType: "normal",
        });

        socket.emit("stopTyping", {
            senderId: userId,
            recipientId: astrologer?.id || astrologer?._id,
            senderType: userType.toLowerCase(),
        });

        setInputText("");
    };

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const rem = secs % 60;
        return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
    };

    const astroName = astrologer?.name || "Astrologer";
    const astroImg = formatImageUrl(astrologer?.profileImage || astrologer?.image);

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative flex h-[88vh] w-full max-w-[560px] flex-col rounded-3xl border border-amber-200/90 bg-[#fdf8f0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-amber-200/60 bg-[#163014] px-5 py-3.5 text-white">
                    <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-amber-400/80 bg-[#1b4327]">
                            {astroImg ? (
                                <img src={astroImg} alt={astroName} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center font-bold text-amber-200">
                                    {astroName.charAt(0)}
                                </div>
                            )}
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-emerald-500" />
                        </div>

                        <div>
                            <h3 className="font-serif text-base font-bold tracking-tight text-amber-100">{astroName}</h3>
                            <p className="text-[11px] text-emerald-300 font-medium">Active Session</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-amber-200 border border-amber-400/30">
                            <Clock className="h-3.5 w-3.5 text-amber-400" />
                            <span>{formatTime(remainingSeconds)}</span>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            title="End Chat Session"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-200 transition hover:bg-red-600 hover:text-white cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fdf8f0] scrollbar-thin">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-slate-400">
                            <UserIcon className="h-8 w-8 stroke-1 text-slate-300" />
                            <p className="text-xs">Consultation session is live. Send a message to start your conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => {
                            const msgSenderId = typeof msg.sender === "object" ? msg.sender?._id?.toString() : msg.sender?.toString();
                            const isMe = msg.senderModel === userType || msgSenderId === userId?.toString();
                            const textContent = msg.message || msg.messageText || "";

                            return (
                                <div key={msg._id || index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs break-words ${isMe
                                                ? "bg-[#c85a17] text-white rounded-br-2xs"
                                                : "bg-white border border-amber-200/80 text-slate-800 rounded-bl-2xs"
                                            }`}
                                    >
                                        {textContent}
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl rounded-bl-2xs border border-amber-200/80 bg-white px-3.5 py-2 text-xs text-slate-500 shadow-xs flex items-center gap-1.5">
                                <span className="font-semibold text-slate-600">{astroName}</span> is typing
                                <span className="flex gap-0.5">
                                    <span className="h-1 w-1 rounded-full bg-slate-400 animate-bounce" />
                                    <span className="h-1 w-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                                    <span className="h-1 w-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                                </span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-amber-200/70 bg-white p-3">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        className="flex-1 rounded-full border border-amber-200/90 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1b4327] focus:outline-none focus:bg-white transition"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1b4327] text-white shadow-sm transition hover:bg-[#13321d] disabled:opacity-40 disabled:hover:bg-[#1b4327] cursor-pointer"
                    >
                        <Send className="h-4 w-4 ml-0.5" />
                    </button>
                </form>
            </div>
        </div>
    );
}