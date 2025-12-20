import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
        <div className="inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-sm font-medium text-accent-700 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Zap className="mr-2 h-3.5 w-3.5 fill-accent-500 text-accent-500" />
          <span>New: Receive payments via Bank Transfer instantly</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
          Start your Nigerian business <br className="hidden md:inline" />
          <span className="text-primary-600">online in minutes.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The easiest way to sell products, services, and bookings. 
          No coding required. Instant payouts to your local bank account.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-14 px-8 text-lg bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-500/25 transition-all hover:scale-105">
              Create Free Store <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full h-14 px-8 text-lg border-2 rounded-full hover:bg-gray-50">
              View Demo Store
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>Free Subdomain</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>Instant Payouts</span>
          </div>
        </div>
      </div>
    </section>
  );
}