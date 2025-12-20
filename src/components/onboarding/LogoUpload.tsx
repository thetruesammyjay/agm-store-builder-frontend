"use client";

import { useState } from "react";
import { useUpload } from "@/hooks/useUpload";
import { UploadCloud, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "@/store/notificationStore";

interface LogoUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync: uploadImage } = useUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File too large", "Logo must be under 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file", "Please upload an image file (PNG, JPG, SVG)");
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage({ 
        file, 
        type: 'logo',
        onProgress: (progress) => {
          // Optional: Add detailed progress bar logic here if needed
          // console.log(progress.percentage);
        }
      });
      
      if (url) {
        onChange(url);
        toast.success("Logo uploaded", "Your store branding has been updated.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed", "Could not upload logo. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset input value to allow re-uploading same file if needed
      e.target.value = "";
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-32 h-32 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm group mx-auto md:mx-0">
          <Image
            src={value}
            alt="Store Logo"
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 128px"
          />
          <button
            onClick={handleRemove}
            type="button"
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            aria-label="Remove logo"
          >
            <X className="text-white h-6 w-6" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full max-w-sm">
          <label
            className={cn(
              "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 transition-colors border-gray-300",
              isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 hover:border-primary-400"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-2" />
                  <p className="text-sm text-gray-500">Uploading...</p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Click to upload logo</p>
                  <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (Max 2MB)</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}