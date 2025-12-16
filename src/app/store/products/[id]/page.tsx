import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { ImageGallery } from "@/components/products/ImageGallery";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { InventoryTracker } from "@/components/products/InventoryTracker";
import { BackButton } from "@/components/shared/BackButton";

async function getProduct(username: string, productId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}/products/${productId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ username: string; id: string }>;
}) {
  const { username, id } = await params;
  const product = await getProduct(username, id);

  if (!product) notFound();

  return (
    <Container className="py-8 md:py-12">
      <BackButton label="Back to Shop" href={`/store/${username}`} className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <ImageGallery 
          images={product.images || []} 
          productName={product.name} 
        />

        {/* Info */}
        <div className="flex flex-col space-y-6">
          <div>
            {product.category && (
              <Badge variant="secondary" className="mb-3 text-xs capitalize">
                {product.category}
              </Badge>
            )}
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-primary-600">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <InventoryTracker stock={product.stockQuantity} />
          </div>

          {/* Variations Placeholder */}
          {product.variations && product.variations.length > 0 && (
            <div className="space-y-3 py-4 border-y border-gray-100">
              {product.variations.map((v: any) => (
                <div key={v.name}>
                  <p className="text-sm font-medium text-gray-900 mb-2">{v.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt: string) => (
                      <span key={opt} className="px-3 py-1 rounded-md border text-sm hover:border-gray-400 cursor-pointer">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0] || "",
                stockQuantity: product.stockQuantity
              }} 
              storeUsername={username} 
              fullWidth 
              className="h-14 text-lg"
            />
          </div>

          <div className="prose prose-sm text-gray-600 mt-8">
            <h3 className="text-gray-900 font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-line">{product.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}