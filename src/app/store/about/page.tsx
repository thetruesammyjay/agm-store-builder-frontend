import { Container } from "@/components/shared/Container";
import { StoreContact } from "@/components/store/StoreContact";

async function getStore(username: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function StoreAboutPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const store = await getStore(username);

  if (!store) return null;

  return (
    <Container className="py-12 md:py-20 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        About {store.displayName}
      </h1>
      
      <div className="prose prose-lg mx-auto text-gray-600 mb-16">
        {store.description ? (
            <p className="whitespace-pre-line">{store.description}</p>
        ) : (
            <p className="text-center italic text-gray-400">No description available.</p>
        )}
      </div>

      <StoreContact store={store} />
    </Container>
  );
}