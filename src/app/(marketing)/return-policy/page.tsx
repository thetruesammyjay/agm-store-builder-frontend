import Link from "next/link";
import { 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CreditCard,
  AlertTriangle,
  HelpCircle,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Card } from "@/components/ui/card";

export default function ReturnPolicyPage() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <Container className="max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <RotateCcw className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Return & Refund Policy</h1>
            <p className="text-gray-500">Our commitment to customer satisfaction</p>
            <p className="text-sm text-gray-400">Last Updated: December 2025</p>
          </div>

          <hr className="my-8 border-gray-100" />

          <div className="space-y-12">
            
            {/* Intro */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                At AGM Store Builder, we provide digital services. If you are not completely satisfied with your subscription, we are here to help. 
                <br /><br />
                <strong>Note to Buyers:</strong> If you purchased a product from a store hosted on AGM, please contact that store directly for their specific return policy. AGM is the platform provider and does not manage individual store inventory.
              </p>
            </div>

            {/* Section 1 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-bold">1</span>
                Refund Eligibility (For Store Owners)
              </h3>
              <p className="text-gray-600 mb-4">To be eligible for a refund on your AGM Store Builder subscription plan:</p>

              <div className="space-y-4">
                <Card className="bg-green-50/50 border-green-200 p-4">
                  <h6 className="flex items-center gap-2 font-bold text-green-800 mb-2">
                    <CheckCircle2 className="w-4 h-4" /> Eligible for Refund:
                  </h6>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-green-900">
                    <li>Duplicate charges due to system error</li>
                    <li>Service downtime exceeding 48 hours continuously</li>
                    <li>Requests made within 7 days of initial subscription (Money Back Guarantee)</li>
                  </ul>
                </Card>

                <Card className="bg-red-50/50 border-red-200 p-4">
                  <h6 className="flex items-center gap-2 font-bold text-red-800 mb-2">
                    <XCircle className="w-4 h-4" /> Not Eligible for Refund:
                  </h6>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-red-900">
                    <li>Change of mind after 7 days</li>
                    <li>Partial use of a subscription period</li>
                    <li>Violation of our Terms of Use resulting in account termination</li>
                    <li>Transaction fees (2%) already processed</li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-bold">2</span>
                Refund Timeframe
              </h3>
              <div className="flex gap-4 items-start border border-gray-200 rounded-xl p-6">
                <Clock className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium mb-2">7-Day Processing Window</p>
                  <p className="text-sm text-gray-600">
                    Once a refund request is approved, it is processed immediately. However, depending on your bank, it may take <strong>5-10 business days</strong> for the funds to appear in your account.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-bold">3</span>
                How to Request a Refund
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6 border-gray-200 hover:border-red-200 transition-colors">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Email Support</h4>
                  <p className="text-sm text-gray-600 mb-4">Send your request with your store URL and transaction reference.</p>
                  <a href="mailto:support@shopwithagm.com" className="text-sm font-medium text-red-600 hover:underline">
                    support@shopwithagm.com
                  </a>
                </Card>
                <Card className="p-6 border-gray-200 hover:border-red-200 transition-colors">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Help Center</h4>
                  <p className="text-sm text-gray-600 mb-4">Use the live chat widget in your dashboard to contact an agent.</p>
                  <Link href="/contact" className="text-sm font-medium text-red-600 hover:underline">
                    Go to Help Center
                  </Link>
                </Card>
              </div>
            </section>

             {/* Footer Links */}
             <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-12">
              <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" /> Related Information
              </h5>
              <div className="flex flex-col sm:flex-row gap-6">
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/terms-of-use" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}