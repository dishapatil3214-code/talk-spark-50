import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading = false, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-chat-input-bg p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className={cn(
              "min-h-[44px] max-h-[120px] resize-none bg-background border-border",
              "focus:ring-primary focus:border-primary transition-colors",
              "placeholder:text-muted-foreground"
            )}
            disabled={disabled || isLoading}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isLoading || disabled}
          className={cn(
            "h-11 w-11 bg-gradient-primary hover:opacity-90 transition-all",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "shadow-lg hover:shadow-xl"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};