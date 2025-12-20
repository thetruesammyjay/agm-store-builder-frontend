import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-primary-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
          Ready to grow your business?
        </h2>
        <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Join thousands of Nigerian entrepreneurs who trust AGM Store Builder. 
          It takes less than 5 minutes to get started.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-accent-500 hover:bg-accent-600 text-accent-950 font-bold">
              Create Your Store <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg border-primary-700 bg-transparent text-white hover:bg-primary-800 hover:text-white">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}