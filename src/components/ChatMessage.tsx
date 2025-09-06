import { Message } from "@/services/chatService";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

export const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={cn(
        "flex gap-3 p-4 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row",
        isLatest && "animate-bounce-in"
      )}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback 
          className={cn(
            "text-xs font-medium",
            isUser 
              ? "bg-gradient-primary text-white" 
              : "bg-chat-bot-bg text-chat-bot-fg border border-border"
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser 
            ? "bg-gradient-message text-chat-user-fg rounded-br-md" 
            : "bg-chat-bot-bg text-chat-bot-fg border border-border rounded-bl-md"
        )}
      >
        {message.isTyping ? (
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-muted-foreground ml-2">AI is thinking...</span>
          </div>
        ) : (
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
};