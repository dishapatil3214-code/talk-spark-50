import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Plus, 
  Settings, 
  Trash2,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId?: string;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export const ChatSidebar = ({ 
  sessions, 
  currentSessionId, 
  onNewChat, 
  onSelectSession, 
  onDeleteSession 
}: ChatSidebarProps) => {
  return (
    <div className="w-64 bg-chat-sidebar-bg border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <h1 className="font-semibold text-foreground">AI Chat</h1>
        </div>
        
        <Button 
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Chat Sessions */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {sessions.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              No chat history yet.
              <br />
              Start a new conversation!
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "group relative rounded-lg p-3 cursor-pointer transition-all",
                    "hover:bg-secondary/50",
                    currentSessionId === session.id && "bg-secondary"
                  )}
                  onClick={() => onSelectSession(session.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {session.title}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {session.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {session.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};