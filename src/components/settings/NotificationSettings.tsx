"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, put } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/store/notificationStore";
import { QUERY_KEYS } from "@/lib/constants";

interface NotificationPreferences {
  emailOrders: boolean;
  smsOrders: boolean;
  marketingEmails: boolean;
}

export function NotificationSettings() {
  const queryClient = useQueryClient();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailOrders: true,
    smsOrders: false,
    marketingEmails: false,
  });

  // Fetch current preferences
  const { data, isLoading } = useQuery({
    queryKey: ['notification-settings'],
    queryFn: async () => {
      // Endpoint to get user/store notification settings
      const res = await get<{ data: NotificationPreferences }>('/settings/notifications');
      return res.data;
    },
  });

  // Sync state when data loads
  useEffect(() => {
    if (data) {
      setPreferences(data);
    }
  }, [data]);

  // Mutation to save settings
  const { mutate: saveSettings, isPending } = useMutation({
    mutationFn: async (newSettings: NotificationPreferences) => {
      await put('/settings/notifications', newSettings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings'] });
      toast.success("Preferences saved");
    },
    onError: () => {
      toast.error("Failed to save preferences");
    },
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose how you want to be notified about activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="space-y-0.5">
            <Label className="text-base">Order Emails</Label>
            <p className="text-sm text-gray-500">Receive an email when you get a new order.</p>
          </div>
          <Switch 
            checked={preferences.emailOrders}
            onCheckedChange={() => handleToggle('emailOrders')}
          />
        </div>
        
        <div className="flex items-center justify-between space-x-4">
          <div className="space-y-0.5">
            <Label className="text-base">SMS Alerts</Label>
            <p className="text-sm text-gray-500">Get text messages for urgent updates (Charges apply).</p>
          </div>
          <Switch 
            checked={preferences.smsOrders}
            onCheckedChange={() => handleToggle('smsOrders')}
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="space-y-0.5">
            <Label className="text-base">Marketing Emails</Label>
            <p className="text-sm text-gray-500">Receive tips, product updates, and news from AGM.</p>
          </div>
          <Switch 
            checked={preferences.marketingEmails}
            onCheckedChange={() => handleToggle('marketingEmails')}
          />
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => saveSettings(preferences)} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}