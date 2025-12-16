import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function TemplatesPage() {
  const templates = [
    {
      id: "products",
      name: "Physical Products",
      description: "Perfect for fashion, electronics, food, and retail.",
      features: ["Grid Layout", "Inventory Tracking", "Cart System"],
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "bookings",
      name: "Services & Bookings",
      description: "Ideal for consultants, barbers, salons, and technicians.",
      features: ["Calendar Integration", "Service Menu", "Appointment Requests"],
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: "portfolio",
      name: "Digital Portfolio",
      description: "For photographers, designers, and creatives.",
      features: ["Gallery View", "Project Showcase", "Contact Form"],
      color: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <div className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900">Choose your style</h1>
                <p className="text-xl text-gray-600">
                    Professional templates designed to convert visitors into customers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {templates.map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white flex flex-col">
                        <div className={`h-48 w-full ${template.color} rounded-xl mb-6 flex items-center justify-center font-bold text-xl`}>
                            {template.name} Preview
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{template.name}</h3>
                        <p className="text-gray-600 mb-6">{template.description}</p>
                        
                        <div className="space-y-3 mb-8 flex-1">
                            {template.features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <Link href={`/signup?template=${template.id}`} className="w-full">
                            <Button className="w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50">
                                Use This Template
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}