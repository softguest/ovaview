"use client";
import { useChat } from "ai/react";
import {
    Bot,
    Loader,
    Loader2,
    MoreHorizontal,
    Plus,
    Send,
    User2,
    X,
  } from "lucide-react";
import Image from "next/image";
import Markdown from "../chat-components/markdown";
import { ChangeEvent, useState } from "react";
import SelectedImages from "../chat-components/selectedImages";
import Messages from "../chat-components/messages";
import InputForm from "../chat-components/inputForm";

const ChatForm = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/gemini",
    });

  return (
    <div className="flex min-h-screen flex-col items-center p-12 text-lg">
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
      <Messages messages={messages} isLoading={isLoading} />
    </div>
  )
}

export default ChatForm