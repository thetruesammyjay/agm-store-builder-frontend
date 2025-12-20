import { 
  Smartphone, 
  CreditCard, 
  Globe, 
  BarChart3, 
  Palette, 
  ShieldCheck 
} from "lucide-react";

const features = [
  {
    title: "Mobile-First Design",
    description: "Your store looks amazing on every device. Optimized for customers shopping on WhatsApp and Instagram.",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Instant Payments",
    description: "Receive money directly to your Nigerian bank account immediately after a sale. No holding periods.",
    icon: CreditCard,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Custom Branding",
    description: "Make it yours. Upload your logo, choose your colors, and pick fonts that match your brand identity.",
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Smart Analytics",
    description: "Track your growth. See who is visiting your store, what they are buying, and how much you are earning.",
    icon: BarChart3,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    title: "Free Subdomain",
    description: "Get a professional link (yourname.shopwithagm.com) instantly to share on your social media bios.",
    icon: Globe,
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    title: "Secure & Reliable",
    description: "Built with bank-grade security. SSL certificates included automatically to keep customer data safe.",
    icon: ShieldCheck,
    color: "text-red-600",
    bg: "bg-red-100",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Everything you need to grow
          </h2>
          <p className="text-lg text-gray-600">
            Powerful tools packed into a simple platform. We handle the technology so you can focus on your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}