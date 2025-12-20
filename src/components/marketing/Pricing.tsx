import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Start for free. Grow at your own pace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div className="relative flex flex-col p-8 bg-white border-2 border-primary-100 rounded-2xl shadow-lg shadow-primary-500/5">
            <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-primary-600 mb-2">Standard</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-gray-900">Free</span>
                <span className="text-gray-500">/ forever</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Just 2% transaction fee on sales</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["Unlimited Products", "Free Subdomain", "Instant Payouts", "Basic Analytics", "Mobile App Access"].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/signup" className="w-full">
              <Button className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold">
                Get Started Now
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-8 bg-gray-50 border border-gray-200 rounded-2xl opacity-75 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded">
              COMING SOON
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-gray-900">₦5k</span>
                <span className="text-gray-500">/ month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Reduced fee (0.5%) + Power features</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["Custom Domain (.com.ng)", "Priority Support", "Advanced Analytics", "Remove AGM Branding", "Inventory Alerts"].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                  <span className="text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" disabled className="w-full h-12">
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}