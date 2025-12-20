"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone"; // Assuming react-dropzone is available, or we use native events
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUpload } from "@/hooks/useUpload";
import { toast } from "@/store/notificationStore";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  disabled?: boolean;
  maxFiles?: number;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  maxFiles = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync: uploadImage } = useUpload();

  // Simple drag-and-drop handler if react-dropzone isn't installed
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      
      if (value.length + files.length > maxFiles) {
        toast.error("Limit reached", `You can only upload up to ${maxFiles} images.`);
        return;
      }

      setIsUploading(true);
      const newUrls: string[] = [];

      try {
        // Upload files sequentially or Promise.all
        for (const file of files) {
          // Validate file type/size here if needed, though hook usually handles it
          const url = await uploadImage({ 
            file, 
            type: 'product',
            onProgress: (progress) => {
              // Optional: Handle progress per file
              console.log(`Uploading ${file.name}: ${progress.percentage}%`);
            }
          });
          if (url) newUrls.push(url);
        }
        
        onChange([...value, ...newUrls]);
        toast.success("Upload complete", `${newUrls.length} images uploaded.`);
      } catch (error) {
        toast.error("Upload failed", "Some images could not be uploaded.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Image Preview Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square rounded-lg border overflow-hidden group">
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Product image"
              src={url}
            />
          </div>
        ))}
      </div>

      {/* Upload Input Area */}
      <div className="flex w-full items-center justify-center">
        <label
          className={cn(
            "relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100",
            (disabled || isUploading) && "pointer-events-none opacity-60",
            value.length >= maxFiles && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {isUploading ? (
              <Loader2 className="mb-2 h-8 w-8 animate-spin text-gray-400" />
            ) : (
              <UploadCloud className="mb-2 h-8 w-8 text-gray-400" />
            )}
            <p className="mb-2 text-sm text-gray-500 font-medium">
              {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or WEBP (MAX. 5MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled || isUploading || value.length >= maxFiles}
          />
        </label>
      </div>
    </div>
  );
}