import Link from "next/link";
import { FileText, ArrowRight, Shield, AlertTriangle, Scale, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/Container";

export default function TermsOfUsePage() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <Container className="max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Terms & Conditions</h1>
            <p className="text-gray-500">General Terms of Use for AGM Store Builder</p>
            <p className="text-sm text-gray-400">Last Updated: December 2025</p>
          </div>

          <hr className="my-8 border-gray-100" />

          <div className="space-y-12">
            
            {/* 1. Introduction */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  <strong>1.1.</strong> "AGM Store Builder" operates an e-commerce platform consisting of a website and mobile application ("marketplace") that allows users ("Sellers") to build online stores and sell products to customers ("Buyers").
                </p>
                <p className="mt-2">
                  <strong>1.2.</strong> These general terms and conditions apply to both Sellers and Buyers using the platform. By using AGM Store Builder, you agree to these terms in full.
                </p>
              </div>
            </section>

            {/* 2. Account */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Registration and Account</h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <ul className="list-disc pl-5 space-y-2">
                  <li>You must be at least 18 years of age to register for an account.</li>
                  <li>You must keep your password confidential and notify us immediately of any unauthorized use.</li>
                  <li>We reserve the right to suspend or terminate accounts that violate our policies or local laws.</li>
                </ul>
              </div>
            </section>

            {/* 3. Platform Usage */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Terms of Service</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> AGM Store Builder provides the infrastructure. We are not a party to the direct transaction between Sellers and Buyers unless explicitly stated.
                </p>
              </div>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  <strong>3.1.</strong> Sellers are responsible for the quality, safety, and legality of the products they list.
                </p>
                <p className="mt-2">
                  <strong>3.2.</strong> Buyers acknowledge that they are purchasing from individual Sellers, not AGM Store Builder directly.
                </p>
              </div>
            </section>

            {/* 4. Payments */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">4. Payments & Fees</h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  <strong>4.1.</strong> AGM charges a transaction fee (currently 2%) on successful sales processed through our platform.
                </p>
                <p className="mt-2">
                  <strong>4.2.</strong> Payouts to Sellers are processed automatically to the bank account provided in settings, subject to bank processing times.
                </p>
              </div>
            </section>

            {/* 5. Prohibited Content */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">5. Prohibited Content</h3>
              <p className="text-gray-600 mb-4">You may not use AGM Store Builder to sell or promote:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4" /> Illegal drugs or substances
                </div>
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4" /> Weapons or explosives
                </div>
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4" /> Fraudulent services
                </div>
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4" /> Adult content
                </div>
              </div>
            </section>

            {/* 6. Liability */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  AGM Store Builder will not be liable for any indirect, special, or consequential loss arising out of the use of our marketplace, including loss of business, revenue, or profits.
                </p>
              </div>
            </section>

            {/* 7. Law */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">7. Governing Law</h3>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 text-blue-800">
                <Scale className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">
                  These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the Nigerian courts.
                </p>
              </div>
            </section>

             {/* Footer Links */}
             <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-12">
              <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Related Policies
              </h5>
              <div className="flex flex-col sm:flex-row gap-6">
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/return-policy" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Return Policy
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