import Image from "next/image";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Chioma Okeke",
      role: "Fashion Vendor",
      content: "I used to struggle with DMs on Instagram. AGM Store Builder made it so easy to manage orders. My sales have doubled!",
      image: "/images/avatars/chioma.jpg" // Placeholder path
    },
    {
      name: "Tunde Bakare",
      role: "Digital Artist",
      content: "The portfolio template is perfect for showcasing my work. Setting up payments was instant. Highly recommended.",
      image: "/images/avatars/tunde.jpg"
    },
    {
      name: "Amina Yusuf",
      role: "Skincare Brand",
      content: "My customers love how fast the checkout is. The dashboard helps me track my inventory without stress.",
      image: "/images/avatars/amina.jpg"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl mb-16">
          Loved by Nigerian Entrepreneurs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-lg mb-6 flex-1 italic">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
                  {/* Fallback avatar */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary-100 text-primary-700 font-bold">
                    {t.name[0]}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}