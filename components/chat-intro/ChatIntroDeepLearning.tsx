"use client";
import { useChat } from "ai/react";
import Messages from "../chat-components/messages";
import InputForm from "../chat-components/inputForm";

const ChatIntroDeepLearning = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/introdeeplearning",
    });

  return (
    <div className="flex min-h-[80vh] flex-col dark:bg-[#0d0d0d] text-lg text-neutral-900 dark:text-neutral-100">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-3xl px-2 md:px-4">
            <div className="text-2xl text-center text-slate-400 font-bold">
              Ask any Question on this Subject.
            </div>
            <InputForm
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 w-full max-w-3xl mx-auto px-2 md:px-4 py-6 overflow-y-auto space-y-4 custom-scroll">
            <Messages messages={messages} isLoading={isLoading} />
          </div>

          <div className="sticky bottom-2 w-full xl:rounded-2xl max-w-3xl mx-auto md:px-4 md:py-4 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border-t border-neutral-300 dark:border-neutral-700">
            <InputForm
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ChatIntroDeepLearning