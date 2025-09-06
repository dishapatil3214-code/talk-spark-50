import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/hooks/useChat";
import { Bot, Sparkles } from "lucide-react";

export const ChatInterface = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-chat">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">AI Assistant</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Powered by Google Gemini
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="min-h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <div className="h-20 w-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                <Bot className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Welcome to AI Chat
              </h2>
              <p className="text-muted-foreground text-center max-w-md">
                Start a conversation with our AI assistant. Ask questions, get help, 
                or just have a friendly chat!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 max-w-2xl">
                {[
                  "Tell me a fun fact about space",
                  "Help me write a creative story",
                  "Explain quantum physics simply",
                  "Give me a healthy recipe idea"
                ].map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(prompt)}
                    className="p-3 text-left text-sm bg-card border border-border rounded-xl hover:bg-accent transition-colors"
                    disabled={isLoading}
                  >
                    <div className="font-medium text-foreground mb-1">💡 Try asking:</div>
                    <div className="text-muted-foreground">"{prompt}"</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isLatest={index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};