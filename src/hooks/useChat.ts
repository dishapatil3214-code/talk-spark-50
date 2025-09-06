import { useState, useCallback } from "react";
import { Message, chatService } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: chatService.generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: chatService.generateId(),
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await chatService.sendMessage(content);
      
      // Remove typing indicator and add real response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const botMessage: Message = {
          id: chatService.generateId(),
          content: response,
          sender: 'bot',
          timestamp: new Date(),
        };
        return [...withoutTyping, botMessage];
      });
    } catch (error) {
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    deleteMessage,
  };
};