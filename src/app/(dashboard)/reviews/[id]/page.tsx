"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";

interface Review {
  id: string;
  product_id: string;
  product_name: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

export default function ReviewDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchReview();
  }, [params.id]);

  const fetchReview = async () => {
    try {
      const res = await api.get(`/reviews/${params.id}`);
      setReview(res.data.data);
    } catch (error) {
      toast.error("Failed to load review");
      router.push("/dashboard/reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (status: "approved" | "rejected") => {
    setIsUpdating(true);
    try {
      await api.patch(`/reviews/${params.id}/status`, { status });
      toast.success(`Review ${status} successfully`);
      fetchReview();
    } catch (error) {
      toast.error(`Failed to ${status} review`);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Review not found</p>
        <Button onClick={() => router.push("/dashboard/reviews")} className="mt-4">
          Back to Reviews
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg">
                    {review.customer_name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {review.customer_name}
                  </h2>
                  <p className="text-sm text-gray-500">{review.customer_email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? "fill-current" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    review.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : review.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Product</h3>
              <p className="text-gray-900 font-medium">{review.product_name}</p>
            </div>

            {/* Review Comment */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Review</h3>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>

            {/* Metadata */}
            <div className="border-t pt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Submitted:</span>
                <p className="text-gray-900 font-medium">{formatDate(review.created_at)}</p>
              </div>
              <div>
                <span className="text-gray-500">Last Updated:</span>
                <p className="text-gray-900 font-medium">{formatDate(review.updated_at)}</p>
              </div>
            </div>

            {/* Actions */}
            {review.status === "pending" && (
              <div className="border-t pt-6 flex gap-3">
                <Button
                  onClick={() => handleUpdateStatus("approved")}
                  disabled={isUpdating}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Approve Review
                </Button>
                <Button
                  onClick={() => handleUpdateStatus("rejected")}
                  disabled={isUpdating}
                  variant="destructive"
                  className="flex-1"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Reject Review
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
