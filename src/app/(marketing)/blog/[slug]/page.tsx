import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Mock data fetching based on slug
  // In a real app, you would fetch this from a CMS or database
  const slug = params.slug;
  
  // Simple check to ensure we only show the page for our mock links
  const validSlugs = [
    "how-to-start-selling-on-instagram",
    "5-tips-for-better-product-photos",
    "understanding-instant-payouts"
  ];

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl space-y-8">
        <Link href="/blog">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary-600 text-gray-500">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        <article className="prose prose-lg prose-blue max-w-none">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 capitalize">
             {slug.split('-').join(' ')}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <span>By AGM Team</span>
            <span>•</span>
            <span>November 15, 2025</span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-xl font-medium text-gray-900">
              This is a placeholder for the actual blog content. In a real application, this content would be fetched from a database or a headless CMS like Sanity or Strapi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why this matters for your business</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ul className="list-disc pl-6 space-y-2 my-6">
              <li>Key point number one about growing your store.</li>
              <li>Another important strategy for social sellers.</li>
              <li>How to leverage instant payouts for inventory.</li>
            </ul>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </article>

        <div className="mt-12 p-8 bg-blue-50 rounded-2xl text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Ready to put this into practice?</h3>
          <p className="text-gray-600">Start your free AGM Store today and grow your business.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
              Create Your Store
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}