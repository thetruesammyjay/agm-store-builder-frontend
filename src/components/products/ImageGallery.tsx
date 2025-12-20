"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images.length) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-100">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-white">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2",
                selectedImage === image
                  ? "border-primary-500 ring-2 ring-primary-500/20"
                  : "border-transparent hover:border-gray-200"
              )}
            >
              <Image
                src={image}
                alt={`${productName} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}