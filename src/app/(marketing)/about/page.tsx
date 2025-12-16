import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-20 py-12 md:py-20">
      {/* Hero Section */}
      <section className="container px-4 md:px-8 mx-auto text-center max-w-4xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Empowering Nigerian Businesses to <span className="text-primary-500">Go Global</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          AGM Store Builder was born from a simple observation: Nigerian entrepreneurs are incredible, but the tools available to them were either too expensive, too complex, or didn't understand the local market.
        </p>
      </section>

      {/* Mission Grid */}
      <section className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Community First</h3>
            <p className="text-gray-600">
              We build for the Instagram vendor, the WhatsApp market seller, and the SME owner who keeps the economy moving.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Growth Focused</h3>
            <p className="text-gray-600">
              Our tools are designed to help you sell more, manage less, and scale your business without technical headaches.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Trust & Security</h3>
            <p className="text-gray-600">
              We ensure your payments are secure and your payouts are instant, building trust between you and your customers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container px-4 md:px-8 mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
          <p className="text-primary-100 max-w-2xl mx-auto text-lg">
            Join thousands of Nigerian entrepreneurs who are taking their business to the next level with AGM Store Builder.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-accent-900 font-bold h-12 px-8">
              Create Your Store
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}