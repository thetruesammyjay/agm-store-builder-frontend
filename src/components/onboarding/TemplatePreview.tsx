"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface TemplatePreviewProps {
  templateId: string;
  open: boolean;
  onClose: () => void;
}

export function TemplatePreview({ templateId, open, onClose }: TemplatePreviewProps) {
  // Mapping IDs to actual image paths in public/
  const images: Record<string, string> = {
    products: "/templates/products-template.png",
    bookings: "/templates/bookings-template.png",
    portfolio: "/templates/portfolio-template.png",
  };

  const titles: Record<string, string> = {
    products: "Physical Products Template",
    bookings: "Service Bookings Template",
    portfolio: "Portfolio Template",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white z-10">
          <DialogTitle>{titles[templateId]}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
          {/* FIXED: Use md:aspect-video instead of md:aspect-[16/9] */}
          <div className="relative w-full aspect-[9/16] md:aspect-video shadow-2xl rounded-lg overflow-hidden bg-white">
            {/* Fallback container if image is missing */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
               Preview Image Placeholder
            </div>
            
            <Image
              src={images[templateId]}
              alt={`${templateId} preview`}
              fill
              className="object-cover object-top"
              quality={90}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}