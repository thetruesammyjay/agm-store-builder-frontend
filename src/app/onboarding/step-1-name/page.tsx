"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UsernameInput } from "@/components/onboarding/UsernameInput";
import { WizardNav } from "@/components/onboarding/WizardNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckUsername } from "@/hooks/useStore";
import { toast } from "@/store/notificationStore";

export default function Step1Name() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Real-time availability check
  const { data: isAvailable, isLoading: isChecking } = useCheckUsername(username);

  // Load saved state
  useEffect(() => {
    const savedData = sessionStorage.getItem("onboarding_store");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUsername(parsed.username || "");
      setDisplayName(parsed.displayName || "");
    }
    setIsLoaded(true);
  }, []);

  const handleNext = () => {
    if (!username || !displayName) {
      toast.error("Required fields", "Please fill in your business name and username");
      return;
    }

    if (username.length < 3) {
      toast.error("Invalid username", "Username must be at least 3 characters");
      return;
    }

    if (isAvailable === false) {
      toast.error("Username taken", "Please choose another username");
      return;
    }

    // Persist to session storage
    sessionStorage.setItem("onboarding_store", JSON.stringify({ 
      username, 
      displayName 
    }));
    
    router.push("/onboarding/step-2-template");
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Name your store</h1>
        <p className="text-gray-500">
          What should we call your business? This will be your brand identity.
        </p>
      </div>

      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Business Name</Label>
          <Input 
            id="displayName" 
            placeholder="e.g. AGM Fashion House" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        <UsernameInput 
          value={username} 
          onChange={setUsername} 
        />
      </div>

      <WizardNav 
        onNext={handleNext} 
        isNextDisabled={!username || !displayName || isAvailable === false || isChecking} 
        onBack={() => router.push("/")}
        backLabel="Cancel Setup"
      />
    </div>
  );
}