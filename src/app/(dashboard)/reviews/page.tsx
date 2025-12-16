"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetch for now as it's a new endpoint
    const fetchReviews = async () => {
      try {
        const res = await api.get("/dashboard/reviews");
        setReviews(res.data.data);
      } catch (error) {
        console.error("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-sm text-gray-500">Manage customer feedback for your products.</p>
      </div>

      {isLoading ? (
        <div>Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <Card className="border-dashed bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Star className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="font-semibold text-gray-900">No reviews yet</h3>
            <p className="text-gray-500">Reviews will appear here when customers rate your products.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>{review.customerName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                      <p className="text-xs text-gray-500">on {review.productName} • {formatDate(review.createdAt)}</p>
                      <div className="flex text-yellow-400 my-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    {review.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100">
                          <CheckCircle className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100">
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}