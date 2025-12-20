"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/store/notificationStore";

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  className?: string;
}

export function FileUploader({ 
  onUpload, 
  accept = "image/*", 
  maxSizeMB = 5,
  label = "Upload File",
  className 
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error("File too large", `Maximum file size is ${maxSizeMB}MB`);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(file);
      // We don't reset input here automatically in case parent wants to keep reference, 
      // but usually good practice to reset for new uploads
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error("Upload failed", "Please try again");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors border-gray-300",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-2" />
            <p className="text-sm text-gray-500">Uploading...</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-xs text-gray-400 mt-1">Max {maxSizeMB}MB</p>
          </>
        )}
      </div>
    </div>
  );
}