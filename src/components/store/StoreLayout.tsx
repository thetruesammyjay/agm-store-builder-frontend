import { StoreHeader } from "./StoreHeader";
import { StoreFooter } from "./StoreFooter";
import type { Store } from "@/types";

interface StoreLayoutProps {
  store: Store;
  children: React.ReactNode;
}

export function StoreLayout({ store, children }: StoreLayoutProps) {
  // We can inject custom CSS variables for branding here if needed
  const brandingStyles = {
    "--store-primary": store.customColors?.primary || "#3b82f6",
    "--store-accent": store.customColors?.accent || "#eab308",
  } as React.CSSProperties;

  return (
    <div className="flex flex-col min-h-screen bg-white" style={brandingStyles}>
      <StoreHeader store={store} />
      <main className="flex-1">
        {children}
      </main>
      <StoreFooter store={store} />
    </div>
  );
}