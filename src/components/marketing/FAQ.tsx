import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Do I need to know how to code?",
      answer: "Not at all! AGM Store Builder is designed to be as simple as using social media. You can set up your store, add products, and start selling in just a few clicks."
    },
    {
      question: "How do I get paid?",
      answer: "We use Monnify to process payments. When a customer buys from your store, the money is instantly verified and sent directly to the bank account you provide in your settings."
    },
    {
      question: "Is there a monthly fee?",
      answer: "No, the Standard plan is completely free to start. We only charge a small transaction fee (2%) when you actually make a sale."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Currently, we provide a free agmshop.com subdomain (e.g., mystore.shopwithagm.com). Custom domain support is coming soon in our Pro plan."
    },
    {
      question: "What can I sell?",
      answer: "You can sell physical products (clothes, food, gadgets), digital items, or services (consulting, hair appointments). We support various business types."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl mb-12">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}