import { 
  Zap, 
  Smartphone, 
  CreditCard, 
  Globe, 
  BarChart3, 
  Palette 
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: "5-Minute Setup",
      description: "Get your store online faster than making a cup of coffee. No technical skills needed.",
      color: "text-accent-500",
      bg: "bg-yellow-100"
    },
    {
      icon: Smartphone,
      title: "Mobile First Design",
      description: "Your store looks perfect on every phone. Optimized for sharing on WhatsApp and Instagram.",
      color: "text-primary-500",
      bg: "bg-blue-100"
    },
    {
      icon: CreditCard,
      title: "Instant Payouts",
      description: "Receive payments directly to your bank account instantly. No waiting days for your money.",
      color: "text-green-500",
      bg: "bg-green-100"
    },
    {
      icon: Globe,
      title: "Free Subdomain",
      description: "Get a professional web address (username.shopwithagm.com) instantly upon signup.",
      color: "text-purple-500",
      bg: "bg-purple-100"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Track your sales, visitors, and best-performing products with our simple dashboard.",
      color: "text-orange-500",
      bg: "bg-orange-100"
    },
    {
      icon: Palette,
      title: "Brand Customization",
      description: "Add your logo, choose your colors, and make the store truly yours.",
      color: "text-pink-500",
      bg: "bg-pink-100"
    }
  ];

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900">Everything you need to sell online</h1>
          <p className="text-xl text-gray-600">
            Powerful tools packed into a simple, easy-to-use platform designed for the Nigerian market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}