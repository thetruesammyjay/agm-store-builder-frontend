import { UserPlus, Store, Share2, Banknote } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create Account",
      description: "Sign up in seconds. No technical skills required.",
      icon: UserPlus,
    },
    {
      id: 2,
      title: "Setup Store",
      description: "Add your products, logo, and bank details.",
      icon: Store,
    },
    {
      id: 3,
      title: "Share Link",
      description: "Post your store link on WhatsApp, Instagram, or Twitter.",
      icon: Share2,
    },
    {
      id: 4,
      title: "Get Paid",
      description: "Receive orders and get instant alerts and payments.",
      icon: Banknote,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From idea to income in 4 steps
          </h2>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center text-center bg-white">
                <div className="w-24 h-24 bg-white border-4 border-primary-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                    <step.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
                
                {/* Step Number Badge */}
                <div className="absolute top-0 right-1/4 md:right-0 bg-accent-500 text-accent-900 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}