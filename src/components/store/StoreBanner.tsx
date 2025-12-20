import Image from "next/image";
import type { Store } from "@/types";

interface StoreBannerProps {
  store: Store;
}

export function StoreBanner({ store }: StoreBannerProps) {
  if (!store.bannerUrl) return null;

  return (
    <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
      <Image
        src={store.bannerUrl}
        alt={`${store.displayName} Banner`}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
        <h1 className="text-3xl md:text-5xl font-bold shadow-sm">{store.displayName}</h1>
        {store.description && (
          <p className="mt-2 text-lg md:text-xl text-white/90 max-w-2xl line-clamp-2 shadow-sm">
            {store.description}
          </p>
        )}
      </div>
    </div>
  );
}