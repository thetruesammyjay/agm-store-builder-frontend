import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const posts = [
    {
      slug: "how-to-start-selling-on-instagram",
      title: "How to Start Selling on Instagram in Nigeria (2025 Guide)",
      excerpt: "A complete guide to turning your Instagram followers into paying customers using AGM Store Builder.",
      category: "Guides",
      date: "May 15, 2025",
      image: "bg-blue-100" // Using color placeholder instead of image URL to avoid broken links
    },
    {
      slug: "5-tips-for-better-product-photos",
      title: "5 Tips for Taking Better Product Photos with Your Phone",
      excerpt: "You don't need an expensive camera. Here is how to make your products look professional using just your smartphone.",
      category: "Photography",
      date: "May 12, 2025",
      image: "bg-yellow-100"
    },
    {
      slug: "understanding-instant-payouts",
      title: "Why Instant Payouts Matter for Your Small Business",
      excerpt: "Cash flow is king. Learn how AGM's instant payout system keeps your business running smoothly.",
      category: "Business",
      date: "May 10, 2025",
      image: "bg-green-100"
    }
  ];

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900">AGM Blog</h1>
          <p className="text-xl text-gray-600">Tips, tricks, and guides for Nigerian entrepreneurs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                <div className={`h-48 w-full ${post.image} flex items-center justify-center text-gray-400 font-medium`}>
                   Article Image
                </div>
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 text-sm flex-1">
                    {post.excerpt}
                  </p>
                  <span className="text-primary-600 font-medium text-sm pt-2 inline-flex items-center">
                    Read more &rarr;
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}