import Link from "next/link";
import { 
  Shield, 
  Info, 
  User, 
  Settings, 
  CheckCircle2, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  Globe, 
  Lock, 
  Mail,
  ArrowRight
} from "lucide-react";
import { Container } from "@/components/shared/Container";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <Container className="max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-500">AGM Store Builder Privacy Notice</p>
            <p className="text-sm text-gray-400">Last Updated: December 2025</p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Content */}
          <div className="space-y-12">
            
            {/* Section 1 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">1</span>
                About This Notice
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  This Privacy Notice provides information on how AGM Store Builder collects and processes your personal data when you visit or use our website, mobile applications, devices, services, social media, online and physical locations, and applications that reference this Privacy Policy. It sets out what we do with your personal data and how we keep it secure and explains the rights that you have in relation to your personal data.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">2</span>
                Who We Are
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  AGM Store Builder is a Nigerian-focused e-commerce platform that enables SMEs and social sellers to create professional online stores in under 5 minutes. Our platform connects sellers with buyers, providing tools for inventory management, order processing, and instant payments.
                </p>
                <p className="mt-4">
                  This website and/or mobile app is operated by AGM Store Builder. Any personal data provided or collected by AGM Store Builder is controlled by us in accordance with Nigerian data protection laws.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">3</span>
                The Data We Collect About You
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  Personal data means any information that can be used to identify directly or indirectly a specific individual. We collect your personal data in order to provide tailored products and services and in order to analyse and continually improve our products and services.
                </p>
                <p className="mt-4">
                  You provide us with your personal data when you register your personal details on our website and mobile platforms and transact with the same.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h6 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                      <User className="w-5 h-5 text-primary-600" /> Information You Provide to Us:
                    </h6>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Contact details (such as your name, postal addresses, phone numbers, and email addresses)</li>
                      <li>Demographic information (such as your date of birth, age or age range, and gender)</li>
                      <li>Online registration information (such as your password and other authentication information)</li>
                      <li>Payment information (such as your bank account details for payouts and billing address)</li>
                      <li>Information provided as part of online questionnaires (such as responses to any customer satisfaction surveys or market research)</li>
                      <li>Competition entries/submissions</li>
                      <li>In certain cases your marketing preferences</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h6 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                      <Settings className="w-5 h-5 text-primary-600" /> Information We Automatically Collect:
                    </h6>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Information about your device (such as your PC, tablet or other mobile device)</li>
                      <li>Your use of our websites and apps</li>
                      <li>Information about your device, operating system, browser, and IP address</li>
                      <li>Unique identifiers associated with your device</li>
                      <li>Details of web pages that you have visited</li>
                      <li>Products you have looked at online (including information about products you have searched for or viewed)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 text-sm text-blue-800">
                    <Info className="w-5 h-5 shrink-0" />
                    <div>
                      <strong>Your Choice:</strong> We strive to provide you with choices regarding the Personal Data that you provide to us. You can adjust your preferences at any time by closing your account or by sending an email to <a href="mailto:privacy@shopwithagm.com" className="underline hover:text-blue-900">privacy@shopwithagm.com</a>.
                    </div>
                  </div>
                </div>
              </div>
            </section>

             {/* Section 4 */}
             <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">4</span>
                Cookies and Other Identifiers
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  A cookie is a small file of letters and numbers that we put on your computer, mobile phone or tablet if you agree. Cookies allow us to distinguish you from other users of our website and mobile applications, which helps us to provide you with an enhanced browsing experience.
                </p>
                <p className="mt-2">
                  For more information about cookies and how we use them, please read our <Link href="/cookie-policy" className="text-primary-600 hover:underline">Cookie Policy</Link>.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">5</span>
                How We Use Your Personal Data
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>We use your personal data to operate, provide, develop and improve the products and services that we offer, including:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Registering you as a new customer or seller</li>
                  <li>Processing and delivering your orders or payouts</li>
                  <li>Managing your relationship with us</li>
                  <li>Enabling you to participate in promotions, competitions and surveys</li>
                  <li>Improving our website, applications, products and services</li>
                  <li>Recommending/advertising products or services which may be of interest to you</li>
                  <li>Complying with our legal obligations, including verifying your identity where necessary</li>
                  <li>Detecting fraud and ensuring compliance</li>
                </ul>
              </div>
            </section>

             {/* Section 6 */}
             <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">6</span>
                Legal Basis for Processing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="border border-gray-200 rounded-xl p-4 hover:border-primary-200 transition-colors">
                  <h6 className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Consent
                  </h6>
                  <p className="text-sm text-gray-600">Where you have provided your consent to receive certain marketing from us. You can withdraw your consent at any time.</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 hover:border-primary-200 transition-colors">
                  <h6 className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <Briefcase className="w-4 h-4 text-primary-500" /> Legitimate Interests
                  </h6>
                  <p className="text-sm text-gray-600">Where it is necessary for us to understand our customers, promote our services and operate effectively.</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 hover:border-primary-200 transition-colors">
                  <h6 className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <FileText className="w-4 h-4 text-orange-500" /> Performance of Contract
                  </h6>
                  <p className="text-sm text-gray-600">Where we need to use your contact details and payment information to process your order and deliver products to you.</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 hover:border-primary-200 transition-colors">
                  <h6 className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" /> Compliance with Law
                  </h6>
                  <p className="text-sm text-gray-600">Where we are subject to a legal obligation and need to use your personal data to comply with that obligation.</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">7</span>
                How We Share Your Data
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                <p>We may need to share your personal data with third parties for the following purposes:</p>
                <div>
                  <strong className="text-gray-900">A. Sale of Products and Services:</strong>
                  <p>In order to deliver products and services purchased on our marketplace, we may be required to provide your personal data to third parties (like delivery partners).</p>
                </div>
                <div>
                  <strong className="text-gray-900">B. Working with Third-Party Service Providers:</strong>
                  <p>We engage third parties to perform certain functions on our behalf. Examples include fulfilling orders, delivering packages, analyzing data, processing payments, and providing customer service.</p>
                </div>
                <div>
                  <strong className="text-gray-900">C. Detecting Fraud and Abuse:</strong>
                  <p>We release account and other personal data to other companies and organizations for fraud protection and credit risk reduction, and to comply with applicable law.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mt-4">
                  <strong>Protection Measures:</strong> When we share your personal data with third parties, we require them to agree to use your data in accordance with the terms of this Privacy Notice and applicable law.
                </div>
              </div>
            </section>

             {/* Section 8 */}
             <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">8</span>
                Data Retention
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>We will take every reasonable step to ensure that your personal data is processed for the minimum period necessary. Your Personal Data may be retained in a form that allows for identification only for as long as:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>We maintain an ongoing relationship with you.</li>
                  <li>Your Personal Data is necessary in connection with the purposes set out in this Privacy Notice.</li>
                  <li>The duration of any applicable limitation period (i.e., any period during which a person could bring a legal claim against us).</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">9</span>
                Data Security
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>We have put in place security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>
                <p className="mt-2">
                  In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">10</span>
                Your Legal Rights
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p className="mb-4">It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                   <div className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <div>
                        <strong className="text-gray-900 block">Right to Access</strong>
                        <span className="text-sm">Request access to your personal data</span>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <div>
                        <strong className="text-gray-900 block">Right to Correct</strong>
                        <span className="text-sm">Request correction of your personal data</span>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <div>
                        <strong className="text-gray-900 block">Right to Erase</strong>
                        <span className="text-sm">Request deletion of your personal data</span>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <div>
                        <strong className="text-gray-900 block">Right to Object</strong>
                        <span className="text-sm">Object to processing of your personal data</span>
                      </div>
                   </div>
                </div>
                <p>
                   You can also lodge a complaint with the Data Protection regulator, the Nigeria Data Protection Commission (NDPC).
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">11</span>
                Contact Us
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  If you have any questions or concerns about this Privacy Notice or wish to exercise your legal rights, please contact the Data Privacy Officer by email at <a href="mailto:privacy@shopwithagm.com" className="text-primary-600 hover:underline">privacy@shopwithagm.com</a>.
                </p>
                <p className="mt-2">
                  We will investigate any complaint about the way we manage Personal Data and ensure that we respond to all substantiated complaints within prescribed timelines.
                </p>
              </div>
            </section>

            {/* Footer Links */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-12">
              <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Related Information
              </h5>
              <div className="flex flex-col sm:flex-row gap-6">
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/cookie-policy" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-use" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Terms of Use
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/return-policy" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Return Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Contact Support
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