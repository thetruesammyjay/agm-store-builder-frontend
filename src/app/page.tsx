import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Store, 
  Smartphone, 
  CreditCard, 
  Zap, 
  Globe, 
  TrendingUp,
  ShoppingBag,
  Wallet,
  PlayCircle,
  Package,
  ShieldCheck,
  Users
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white overflow-x-hidden selection:bg-primary-100 selection:text-primary-900">
      <Navbar />

      <main className="flex-1 relative">
        {/* --- Animated Background Elements --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top Left Blob (Blue) */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse duration-[4s]" />
          
          {/* Bottom Right Blob (Yellow) */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-100/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
          
          {/* Floating Context Icons */}
          {/* We use animate-bounce with long durations to simulate floating */}
          <div className="hidden lg:block absolute top-32 left-[10%] opacity-20 animate-bounce duration-3000">
            <div className="p-4 bg-primary-100 rounded-2xl rotate-[-10deg]">
              <Store className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <div className="hidden lg:block absolute top-48 right-[15%] opacity-20 animate-bounce duration-4000 delay-700">
            <div className="p-4 bg-accent-100 rounded-2xl rotate-12">
              <ShoppingBag className="w-10 h-10 text-accent-600" />
            </div>
          </div>
          <div className="hidden lg:block absolute bottom-40 left-[15%] opacity-15 animate-bounce duration-5000 delay-1000">
            <div className="p-5 bg-green-100 rounded-2xl rotate-[5deg]">
              <Wallet className="w-14 h-14 text-green-600" />
            </div>
          </div>
        </div>

        {/* --- Hero Section --- */}
        <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 px-6">
          <div className="container max-w-6xl mx-auto text-center relative z-10">
            
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 bg-primary-50 border border-primary-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 cursor-pointer hover:bg-primary-100 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs md:text-sm font-semibold text-primary-800 tracking-wide uppercase">
                New: Instant Bank Payouts Available
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              The Easiest Way to <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500">
                Sell Online in Nigeria
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Build a professional online store in minutes. Optimized for Instagram vendors and SMEs. 
              No coding required. Get paid instantly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 text-lg bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-xl shadow-primary-200 transition-transform hover:scale-105">
                  Start Selling Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-14 px-8 text-lg border-2 border-gray-200 bg-white/50 backdrop-blur-sm rounded-full hover:bg-gray-50 text-gray-700">
                  <PlayCircle className="mr-2 h-5 w-5" /> View Demo Store
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                No Monthly Fees
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Instant Payouts
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Free Subdomain
              </div>
            </div>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-12 border-y border-gray-100 bg-gray-50/50 relative overflow-hidden">
           <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Stores", value: "2,000+" },
                { label: "Transactions", value: "₦500M+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Support", value: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section id="how-it-works" className="py-24 px-6 relative">
          <div className="container max-w-6xl mx-auto">
             <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                From Idea to <span className="text-primary-600">Income</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Launch your business in 4 simple steps. No technical skills required.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10" />

              {[
                { title: "Sign Up", desc: "Create your free account in seconds.", icon: Users, color: "bg-blue-100 text-blue-600" },
                { title: "Add Products", desc: "Upload photos, prices, and descriptions.", icon: Package, color: "bg-yellow-100 text-yellow-600" },
                { title: "Share Link", desc: "Post your store link on social media.", icon: Globe, color: "bg-purple-100 text-purple-600" },
                { title: "Get Paid", desc: "Receive instant payments from customers.", icon: Wallet, color: "bg-green-100 text-green-600" },
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center bg-white p-4">
                  <div className="w-24 h-24 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm z-10">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  
                  <div className="absolute top-0 right-1/4 md:right-0 bg-primary-600 text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section id="features" className="py-24 px-6 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Built for <span className="text-accent-600">Growth</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Everything you need to manage and scale your business efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Mobile-First Design",
                  desc: "Your store looks amazing on every device. Optimized for customers shopping on WhatsApp.",
                  icon: Smartphone,
                  color: "bg-blue-100 text-blue-600"
                },
                {
                  title: "Instant Payments",
                  desc: "Receive money directly to your Nigerian bank account immediately after a sale.",
                  icon: CreditCard,
                  color: "bg-green-100 text-green-600"
                },
                {
                  title: "Free Subdomain",
                  desc: "Get a professional link (yourname.agmshops.com) instantly to share on bio.",
                  icon: Globe,
                  color: "bg-purple-100 text-purple-600"
                },
                {
                  title: "Smart Analytics",
                  desc: "Track your sales, visitors, and best-performing products with our simple dashboard.",
                  icon: TrendingUp,
                  color: "bg-orange-100 text-orange-600"
                },
                {
                  title: "Secure & Reliable",
                  desc: "Bank-grade security with SSL certificates included automatically to keep data safe.",
                  icon: ShieldCheck,
                  color: "bg-red-100 text-red-600"
                },
                {
                  title: "Fast Checkout",
                  desc: "Optimized checkout flow that reduces abandoned carts and increases conversion.",
                  icon: Zap,
                  color: "bg-yellow-100 text-yellow-600"
                }
              ].map((feature, i) => (
                <div key={i} className="group p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-24 px-6">
          <div className="container max-w-5xl mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-primary-900 p-12 md:p-24 text-center shadow-2xl">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-md">
                  <Zap className="w-4 h-4 text-accent-400" />
                  <span>Ready to launch?</span>
                </div>
                
                <h2 className="text-3xl md:text-6xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
                  Join thousands of Nigerian entrepreneurs growing with AGM
                </h2>
                
                <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto">
                  Stop worrying about technical details. Start selling in 5 minutes.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-full border-none shadow-lg shadow-accent-500/20">
                      Create Your Store
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg text-white border-primary-400 bg-transparent hover:bg-primary-800 rounded-full">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}