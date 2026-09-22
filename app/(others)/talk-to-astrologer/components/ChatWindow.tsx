"use client";

import { useState, useEffect, useRef } from "react";
import {
    X,
    Send,
    Clock,
    User as UserIcon,
    FileText,
    Download,
    Image as ImageIcon,
    ExternalLink,
    Paperclip,
    Loader2,
} from "lucide-react";
import { Socket } from "socket.io-client";
import { formatImageUrl } from "@/lib/utils";
import axios from "@/config/axios";
import { toast } from "@components/ui/toaster";

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

export interface MediaItem {
    url: string;
    type?: string; // "image" | "video" | "pdf" | "document" | "csv" | "other"
    mimeType?: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    mediaType?: string;
    [key: string]: any;
}

export interface MessageItem {
    _id?: string;
    sender?: any;
    senderModel?: string;
    messageText?: string;
    message?: string;
    media?: (MediaItem | string)[];
    file?: string;
    files?: (MediaItem | string)[];
    imageUrl?: string;
    image?: string;
    timestamp?: string | Date;
    [key: string]: any;
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
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(
        session?.maxWaitingTime || 0
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, filePreviewUrl]);

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
            console.log(
                "%c📩 [ChatSocket] Received 'newMessage':",
                "color: #0284c7; font-weight: bold; font-size: 13px; background: #e0f2fe; padding: 4px 8px; border-radius: 4px;",
                msg
            );
            setMessages((prev) => [...prev, msg]);
        };

        const handleMessageSent = (msg: MessageItem) => {
            console.log(
                "%c📤 [ChatSocket] Emitted message confirmed 'messageSent':",
                "color: #10b981; font-weight: bold; font-size: 13px; background: #d1fae5; padding: 4px 8px; border-radius: 4px;",
                msg
            );
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("newMessage", handleNewMessage);
        socket.on("messageSent", handleMessageSent);

        socket.on("userTyping", () => setIsTyping(true));
        socket.on("userStoppedTyping", () => setIsTyping(false));

        socket.on("chatSessionPaused", (data: any) => {
            console.log("⏸️ [ChatSocket] Session Paused:", data);
            if (typeof data?.maxWaitingTime === "number") {
                setRemainingSeconds(data.maxWaitingTime);
            }
        });

        socket.on("chatSessionResumed", (data: any) => {
            console.log("▶️ [ChatSocket] Session Resumed:", data);
            if (typeof data?.maxWaitingTime === "number") {
                setRemainingSeconds(data.maxWaitingTime);
            }
        });

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("messageSent", handleMessageSent);
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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 25MB size limit check
        if (file.size > 25 * 1024 * 1024) {
            toast.error("File size exceeds 25MB limit.");
            return;
        }

        setSelectedFile(file);

        if (file.type.startsWith("image/")) {
            const preview = URL.createObjectURL(file);
            setFilePreviewUrl(preview);
        } else {
            setFilePreviewUrl(null);
        }
    };

    const clearSelectedFile = () => {
        if (filePreviewUrl) {
            URL.revokeObjectURL(filePreviewUrl);
        }
        setSelectedFile(null);
        setFilePreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text && !selectedFile) return;

        const targetId = astrologer?.id || astrologer?._id;

        // Stop typing indicator
        if (socket) {
            socket.emit("stopTyping", {
                senderId: userId,
                recipientId: targetId,
                senderType: userType.toLowerCase(),
            });
        }

        // Case 1: If a file is selected -> Send via POST /send (multipart/form-data)
        if (selectedFile) {
            setIsUploading(true);
            try {
                const formData = new FormData();
                formData.append("media", selectedFile);
                formData.append("senderId", userId);
                formData.append("recipientId", targetId);
                formData.append("senderType", userType);
                formData.append("recipientType", userType === "User" ? "Astrologer" : "User");
                formData.append("chatSessionId", session.chatSessionId);
                if (text) {
                    formData.append("messageText", text);
                }

                console.log("📤 [Chat] Uploading media via POST /send...", selectedFile.name);
                const res = await axios.post("/send", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("✅ [Chat] Media uploaded successfully:", res.data);
                if (res.data?.data) {
                    setMessages((prev) => [...prev, res.data.data]);
                }

                clearSelectedFile();
                setInputText("");
            } catch (err: any) {
                console.error("❌ [Chat] Media upload failed:", err);
                toast.error(err?.response?.data?.message || "Failed to send file. Please try again.");
            } finally {
                setIsUploading(false);
            }
            return;
        }

        // Case 2: Regular text message -> Send via socket
        if (!socket) return;

        const payload = {
            chatSessionId: session.chatSessionId,
            senderId: userId,
            senderType: userType, // "User" or "Astrologer"
            messageText: text,
            sessionType: "normal",
        };

        console.log("📤 [ChatSocket] Emitting 'sendMessage':", payload);
        socket.emit("sendMessage", payload);

        setInputText("");
    };

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const rem = secs % 60;
        return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
    };

    const astroName = astrologer?.name || "Astrologer";
    const astroImg = formatImageUrl(astrologer?.profileImage || astrologer?.image);

    // Helper to extract media list from message object
    const getMediaList = (msg: MessageItem): MediaItem[] => {
        const result: MediaItem[] = [];

        // Check msg.media
        if (Array.isArray(msg.media)) {
            msg.media.forEach((item) => {
                if (typeof item === "string") {
                    const ext = item.split("?")[0].split(".").pop()?.toLowerCase() || "";
                    const isImg = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"].includes(ext);
                    result.push({
                        url: item,
                        type: isImg ? "image" : ext === "pdf" ? "pdf" : "other",
                        fileName: item.split("/").pop()?.split("?")[0] || "file",
                    });
                } else if (item && typeof item === "object" && item.url) {
                    result.push(item);
                }
            });
        }

        // Check msg.files
        if (Array.isArray(msg.files)) {
            msg.files.forEach((item) => {
                if (typeof item === "string") {
                    const ext = item.split("?")[0].split(".").pop()?.toLowerCase() || "";
                    const isImg = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"].includes(ext);
                    result.push({
                        url: item,
                        type: isImg ? "image" : ext === "pdf" ? "pdf" : "other",
                        fileName: item.split("/").pop()?.split("?")[0] || "file",
                    });
                } else if (item && typeof item === "object" && item.url) {
                    result.push(item);
                }
            });
        }

        // Check single image fields
        if (typeof msg.file === "string" && msg.file) {
            const ext = msg.file.split("?")[0].split(".").pop()?.toLowerCase() || "";
            const isImg = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"].includes(ext);
            result.push({
                url: msg.file,
                type: isImg ? "image" : "other",
                fileName: msg.file.split("/").pop()?.split("?")[0] || "attachment",
            });
        }

        if (typeof msg.imageUrl === "string" && msg.imageUrl) {
            result.push({ url: msg.imageUrl, type: "image", fileName: "image.jpg" });
        }

        return result;
    };

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
                            const textContent = msg.message || msg.messageText || msg.text || "";
                            const mediaList = getMediaList(msg);

                            return (
                                <div key={msg._id || index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs break-words ${
                                            isMe
                                                ? "bg-[#c85a17] text-white rounded-br-2xs"
                                                : "bg-white border border-amber-200/80 text-slate-800 rounded-bl-2xs"
                                        }`}
                                    >
                                        {/* Render Media Attachments (Images, PDFs, Documents) */}
                                        {mediaList.length > 0 && (
                                            <div className="space-y-2 mb-2">
                                                {mediaList.map((media, mIdx) => {
                                                    const rawUrl = media.url || "";
                                                    const fullUrl = formatImageUrl(rawUrl);
                                                    const backendType = (media.type || media.fileType || media.mediaType || "").toLowerCase();

                                                    const isImage =
                                                        backendType === "image" ||
                                                        media.mimeType?.startsWith("image/") ||
                                                        /\.(jpg|jpeg|png|webp|gif|svg|avif)($|\?)/i.test(rawUrl);

                                                    const isVideo =
                                                        backendType === "video" ||
                                                        media.mimeType?.startsWith("video/") ||
                                                        /\.(mp4|mov|webm|mkv)($|\?)/i.test(rawUrl);

                                                    const isAudio =
                                                        backendType === "audio" ||
                                                        media.mimeType?.startsWith("audio/") ||
                                                        /\.(mp3|wav|ogg|m4a|aac)($|\?)/i.test(rawUrl);

                                                    // 1. Image
                                                    if (isImage) {
                                                        return (
                                                            <div
                                                                key={mIdx}
                                                                onClick={() => setPreviewImage(fullUrl)}
                                                                className="group relative cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-black/5 hover:opacity-95 transition"
                                                            >
                                                                <img
                                                                    src={fullUrl}
                                                                    alt={media.fileName || "Chat Image"}
                                                                    className="max-h-60 w-full object-cover rounded-xl transition group-hover:scale-102"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                                                                    <span className="text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                                                                        <ExternalLink className="h-3 w-3" /> View Image
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    }

                                                    // 2. Video
                                                    if (isVideo) {
                                                        return (
                                                            <div key={mIdx} className="overflow-hidden rounded-xl border border-black/10">
                                                                <video
                                                                    src={fullUrl}
                                                                    controls
                                                                    className="max-h-60 w-full rounded-xl object-contain bg-black"
                                                                />
                                                            </div>
                                                        );
                                                    }

                                                    // 3. Audio / Voice
                                                    if (isAudio) {
                                                        return (
                                                            <div key={mIdx} className="p-2 rounded-xl bg-black/5 border border-black/10">
                                                                <audio src={fullUrl} controls className="w-full h-9" />
                                                            </div>
                                                        );
                                                    }

                                                    // 4. PDF / Document / CSV / Other file attachment
                                                    const isPdf = backendType === "pdf" || media.mimeType === "application/pdf" || /\.pdf($|\?)/i.test(rawUrl);
                                                    return (
                                                        <a
                                                            key={mIdx}
                                                            href={fullUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition ${
                                                                isMe
                                                                    ? "bg-black/15 border-white/20 text-white hover:bg-black/25"
                                                                    : "bg-slate-50 border-amber-200 text-slate-800 hover:bg-amber-50"
                                                            }`}
                                                        >
                                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/80 text-[#c85a17] shrink-0 font-bold text-[10px] uppercase">
                                                                {isPdf ? "PDF" : backendType === "document" ? "DOC" : backendType === "csv" ? "CSV" : <FileText className="h-4 w-4" />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-semibold truncate">
                                                                    {media.fileName || (isPdf ? "Document.pdf" : "Attachment File")}
                                                                </p>
                                                                {media.fileSize ? (
                                                                    <p className="text-[10px] opacity-75">
                                                                        {(media.fileSize / 1024).toFixed(1)} KB
                                                                    </p>
                                                                ) : null}
                                                            </div>
                                                            <Download className="h-4 w-4 shrink-0 opacity-80" />
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Text Content */}
                                        {textContent && <p>{textContent}</p>}
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

                {/* File Attachment Selected Preview Card */}
                {selectedFile && (
                    <div className="mx-3 mb-2 flex items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50/95 p-2.5 shadow-sm animate-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                            {filePreviewUrl ? (
                                <img
                                    src={filePreviewUrl}
                                    alt="Preview"
                                    className="h-11 w-11 rounded-xl object-cover border border-amber-300 shadow-2xs shrink-0"
                                />
                            ) : (
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-200/80 text-amber-900 shrink-0">
                                    <FileText className="h-5 w-5" />
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate max-w-[260px]">
                                    {selectedFile.name}
                                </p>
                                <p className="text-[10px] font-medium text-slate-500">
                                    {(selectedFile.size / 1024).toFixed(1)} KB &bull; Ready to send
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={isUploading}
                            onClick={clearSelectedFile}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200/80 hover:bg-red-100 hover:text-red-700 text-slate-600 transition cursor-pointer shrink-0 disabled:opacity-50"
                            title="Remove attachment"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                )}

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-amber-200/70 bg-white p-3">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
                        className="hidden"
                    />

                    {/* Attachment Paperclip Button */}
                    <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        title="Attach Image or Document"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[#c85a17] transition hover:bg-amber-100 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:hover:scale-100 shadow-2xs"
                    >
                        <Paperclip className="h-4 w-4" />
                    </button>

                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder={selectedFile ? "Add a caption (optional)..." : "Type your message here..."}
                        disabled={isUploading}
                        className="flex-1 rounded-full border border-amber-200/90 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1b4327] focus:outline-none focus:bg-white transition disabled:opacity-60"
                    />

                    <button
                        type="submit"
                        disabled={isUploading || (!inputText.trim() && !selectedFile)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1b4327] text-white shadow-sm transition hover:bg-[#13321d] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:bg-[#1b4327] disabled:hover:scale-100 cursor-pointer"
                    >
                        {isUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
                        ) : (
                            <Send className="h-4 w-4 ml-0.5" />
                        )}
                    </button>
                </form>
            </div>

            {/* Image Fullscreen Preview Modal */}
            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)}
                    className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in"
                >
                    <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setPreviewImage(null)}
                            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}