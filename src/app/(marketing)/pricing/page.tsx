import { Metadata } from "next";
import Link from "next/link";
import { Check, HelpCircle, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pricing - AGM Store Builder",
  description: "Start for free. No monthly fees for our standard plan. We only make money when you make sales.",
};

export default function PricingPage() {
  const faqs = [
    {
      question: "Is the Standard plan really free?",
      answer: "Yes! There are no monthly subscription fees for the Standard plan. You can set up your store, add products, and start selling without paying us a dime. We only charge a small 2% transaction fee when you make a sale."
    },
    {
      question: "How are transaction fees calculated?",
      answer: "When a customer pays you (e.g., ₦10,000), we deduct 2% (₦200) + a standard bank processing fee (approx ₦50) before settling the rest to your bank account instantly."
    },
    {
      question: "Can I upgrade later?",
      answer: "Absolutely. You can start on the free Standard plan and upgrade to Pro whenever you need a custom domain or advanced features. Your products and data will move with you."
    },
    {
      question: "Do I need a credit card to sign up?",
      answer: "No. You only need your bank account details so we can send you your payouts. We don't charge you anything directly."
    },
    {
      question: "What happens if I cancel my Pro subscription?",
      answer: "Your store will automatically revert to the Standard plan. You won't lose your data, but your custom domain will be disconnected and you'll return to the 2% transaction fee structure."
    }
  ];

  return (
    <div className="bg-gray-50 pb-20">
      {/* Header */}
      <section className="bg-primary-900 text-white py-20 md:py-28 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <Container className="relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Start your business with zero capital. Upgrade only when you scale.
          </p>
        </Container>
      </section>

      {/* Pricing Cards */}
      <Container className="-mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Standard Plan */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Standard</h3>
                  <p className="text-gray-500 text-sm mt-1">Perfect for new businesses</p>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                  Most Popular
                </Badge>
              </div>
              <div className="flex items-baseline gap-1 my-6">
                <span className="text-5xl font-extrabold text-gray-900">₦0</span>
                <span className="text-gray-500 font-medium">/ month</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Transaction Fee: <span className="text-primary-600">2.0% + ₦50</span>
              </p>
              <p className="text-xs text-gray-500">
                (Capped at ₦2,000 per transaction)
              </p>
            </div>
            <div className="p-8 flex-1 bg-gray-50/50">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Unlimited Products</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Free Subdomain (you.shopwithagm.com)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Instant Bank Payouts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-700 text-sm">WhatsApp Order Integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Basic Analytics</span>
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button size="lg" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold h-12 shadow-md">
                  Start Selling for Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative opacity-95">
             {/* Coming Soon Overlay - Optional, remove 'opacity-95' above to activate fully */}
             {/* <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <Badge className="text-lg py-2 px-4 bg-gray-900 text-white">Coming Soon</Badge>
             </div> */}
             
            <div className="p-8 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                  <p className="text-gray-500 text-sm mt-1">For scaling brands</p>
                </div>
                <Badge variant="outline" className="border-primary-200 text-primary-700 bg-primary-50">
                  Coming Soon
                </Badge>
              </div>
              <div className="flex items-baseline gap-1 my-6">
                <span className="text-5xl font-extrabold text-gray-900">₦5,000</span>
                <span className="text-gray-500 font-medium">/ month</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Transaction Fee: <span className="text-green-600">0.5% + ₦50</span>
              </p>
              <p className="text-xs text-gray-500">
                (Significantly lower fees for high volume)
              </p>
            </div>
            <div className="p-8 flex-1">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">Everything in Standard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Custom Domain (.com.ng / .com)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Remove "Powered by AGM"</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Priority Support (24/7)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-600 shrink-0" />
                  <span className="text-gray-700 text-sm">Advanced Inventory Management</span>
                </li>
              </ul>
              <Button variant="outline" size="lg" disabled className="w-full border-gray-300 text-gray-500 h-12">
                Join Pro Waitlist
              </Button>
            </div>
          </div>

        </div>
      </Container>

      {/* Comparison Table */}
      <Container className="py-20 md:py-28 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 pl-4 font-semibold text-gray-900 w-1/2">Feature</th>
                <th className="py-4 px-4 font-semibold text-gray-900 text-center w-1/4">Standard</th>
                <th className="py-4 pr-4 font-semibold text-gray-900 text-center w-1/4">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 pl-4 text-gray-600">Monthly Cost</td>
                <td className="py-4 px-4 text-center font-medium">Free</td>
                <td className="py-4 pr-4 text-center font-medium">₦5,000</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 text-gray-600">Transaction Fee</td>
                <td className="py-4 px-4 text-center">2.0%</td>
                <td className="py-4 pr-4 text-center">0.5%</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 text-gray-600">Product Limit</td>
                <td className="py-4 px-4 text-center">Unlimited</td>
                <td className="py-4 pr-4 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 text-gray-600">Custom Domain</td>
                <td className="py-4 px-4 text-center"><Minus className="w-4 h-4 mx-auto text-gray-300" /></td>
                <td className="py-4 pr-4 text-center"><Check className="w-4 h-4 mx-auto text-green-600" /></td>
              </tr>
              <tr>
                <td className="py-4 pl-4 text-gray-600">Store Analytics</td>
                <td className="py-4 px-4 text-center">Basic</td>
                <td className="py-4 pr-4 text-center">Advanced</td>
              </tr>
              <tr>
                <td className="py-4 pl-4 text-gray-600">Instant Payouts</td>
                <td className="py-4 px-4 text-center"><Check className="w-4 h-4 mx-auto text-green-600" /></td>
                <td className="py-4 pr-4 text-center"><Check className="w-4 h-4 mx-auto text-green-600" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>

      {/* FAQ Section */}
      <Container className="max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Everything you need to know about our pricing.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-gray-200 px-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-gray-100 last:border-0">
              <AccordionTrigger className="text-left font-medium text-gray-900 py-6 hover:no-underline hover:text-primary-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-blue-50 rounded-xl p-8 border border-blue-100">
          <HelpCircle className="w-10 h-10 text-primary-500 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our team is happy to answer your questions about pricing and plans.</p>
          <Link href="/contact">
            <Button variant="outline" className="bg-white border-primary-200 text-primary-700 hover:bg-primary-50">
              Contact Support
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}