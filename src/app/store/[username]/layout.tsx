import { notFound } from "next/navigation";
import { StoreLayout } from "@/components/store/StoreLayout";
import { Metadata } from "next";

// Helper to fetch store data on the server
async function getStore(username: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}`, {
      next: { revalidate: 60 }, // Revalidate every minute
    });
    
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch store:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const store = await getStore(username);

  if (!store) {
    return {
      title: "Store Not Found",
    };
  }

  return {
    title: store.displayName,
    description: store.description || `Shop at ${store.displayName}`,
    icons: {
      icon: store.logoUrl || "/favicon.ico",
    },
    openGraph: {
      title: store.displayName,
      description: store.description,
      images: [store.bannerUrl || store.logoUrl || "/og-image.png"],
    },
  };
}

export default async function StoreRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const store = await getStore(username);

  if (!store) {
    notFound();
  }

  return (
    <StoreLayout store={store}>
      {children}
    </StoreLayout>
  );
}