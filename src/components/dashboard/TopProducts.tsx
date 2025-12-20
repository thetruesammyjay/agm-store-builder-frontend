import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export interface ProductData {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image?: string;
  stock: number;
}

interface TopProductsProps {
  products?: ProductData[];
}

export function TopProducts({ products = [] }: TopProductsProps) {
  return (
    <Card className="border border-gray-100 shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pr-2">
        {products.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 min-h-[200px]">
            <Package className="h-8 w-8 opacity-50" />
            <p className="text-sm">No sales data yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden shrink-0">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package className="h-5 w-5 text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate" title={product.name}>
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-normal bg-gray-100 text-gray-600">
                      {product.sales} sold
                    </Badge>
                    {product.stock <= 5 && (
                      <span className="text-[10px] text-red-500 font-medium">
                        Low Stock ({product.stock})
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ₦{product.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}