"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Package, Info, AlertCircle, Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNotifications, useMarkAsRead } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

export function NotificationBell() {
  const { data: notifications = [], isLoading, error } = useNotifications();
  const { mutate: markAsRead, isPending: isMarking } = useMarkAsRead();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.preventDefault();
    markAsRead(undefined); 
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "order": return <Package className="h-4 w-4 text-blue-600" />;
      case "alert": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "order": return "bg-blue-100";
      case "alert": return "bg-red-100";
      default: return "bg-gray-100";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-primary-600 hover:bg-primary-50">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 p-0 shadow-xl border-gray-100">
        <DropdownMenuLabel className="px-4 py-3 border-b flex justify-between items-center bg-gray-50/50">
          <span className="font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-700">
              {unreadCount} New
            </Badge>
          )}
        </DropdownMenuLabel>

        <div className="max-h-[350px] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 flex justify-center text-gray-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-6 text-center text-sm text-red-500">
              Failed to load notifications.
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              You&apos;re all caught up! 
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`p-4 cursor-pointer border-b last:border-0 focus:bg-gray-50 ${notification.unread ? 'bg-blue-50/30' : ''}`}
                onClick={() => {
                  if (notification.unread) markAsRead(notification.id);
                }}
              >
                <div className="flex gap-3 items-start w-full">
                  <div className={`mt-1 p-1.5 rounded-full shrink-0 ${getBgColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className={`text-sm font-medium leading-none truncate ${notification.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-snug line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {(() => {
                        try {
                          return formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });
                        } catch (e) {
                          return "";
                        }
                      })()}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>

        <DropdownMenuSeparator className="m-0" />
        
        <div className="p-2 bg-gray-50/50">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs text-gray-500 h-8 hover:text-primary-600 disabled:opacity-50"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || isMarking}
          >
            {isMarking ? (
              <Loader2 className="h-3 w-3 animate-spin mr-2" />
            ) : (
              <Check className="h-3 w-3 mr-2" />
            )}
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}