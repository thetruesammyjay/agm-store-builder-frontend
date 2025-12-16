import Link from "next/link";
import { Cookie, ShieldCheck, BarChart3, Sliders, Share2, Globe, ArrowRight, Info, Settings, UserCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function CookiePolicyPage() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <Container className="max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Cookie className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Cookie Notice</h1>
            <p className="text-gray-500">How AGM Store Builder uses cookies</p>
            <p className="text-sm text-gray-400">Last Updated: December 2025</p>
          </div>

          <hr className="my-8 border-gray-100" />

          <div className="space-y-12">
            
            {/* About */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-bold">1</span>
                About This Notice
              </h3>
              <div className="prose prose-gray max-w-none text-gray-600">
                <p>
                  This Cookie Notice provides information on how AGM Store Builder uses cookies when you visit our website or mobile applications. Any Personal Data provided to or collected by AGM Store Builder via cookies and other tracking technologies is controlled by us. Kindly familiarise yourself with our cookie practices.
                </p>
              </div>
            </section>

            {/* Definition */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-bold">2</span>
                Cookies and How We Use Them
              </h3>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>What is a Cookie?</strong> A cookie is a small file of letters and numbers that websites send to the browser which are stored in the User terminal, which might be your computer, phones or applications, your personal computer, a mobile phone, a tablet, or any other device.
                </p>
              </div>

              <p className="text-gray-600 mb-6">
                Cookies allow us to distinguish you from other users of our website and mobile applications, which helps us to provide you with an enhanced browsing experience. For example we use cookies for the following purposes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-red-200 bg-red-50/50 rounded-xl p-4">
                  <h6 className="flex items-center gap-2 font-bold text-red-700 mb-2">
                    <UserCheck className="w-4 h-4" /> User Recognition
                  </h6>
                  <p className="text-sm text-gray-600">Recognising and counting the number of visitors and to see how visitors move around our sites.</p>
                </div>
                <div className="border border-red-200 bg-red-50/50 rounded-xl p-4">
                  <h6 className="flex items-center gap-2 font-bold text-red-700 mb-2">
                    <BarChart3 className="w-4 h-4" /> Site Improvement
                  </h6>
                  <p className="text-sm text-gray-600">Improving the way our website works, for example by ensuring that users can find what they are looking for.</p>
                </div>
                <div className="border border-red-200 bg-red-50/50 rounded-xl p-4">
                  <h6 className="flex items-center gap-2 font-bold text-red-700 mb-2">
                    <Settings className="w-4 h-4" /> Preferences
                  </h6>
                  <p className="text-sm text-gray-600">Identifying your preferences and subscriptions e.g. language settings, saved items.</p>
                </div>
                <div className="border border-red-200 bg-red-50/50 rounded-xl p-4">
                  <h6 className="flex items-center gap-2 font-bold text-red-700 mb-2">
                    <Share2 className="w-4 h-4" /> Marketing
                  </h6>
                  <p className="text-sm text-gray-600">Sending you newsletters and commercial/advertising messages tailored to your interests.</p>
                </div>
              </div>
            </section>

            {/* Cookie Preferences */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-bold">3</span>
                Cookie Preferences
              </h3>
              <p className="text-gray-600 mb-6">
                You can manage your cookie preferences below. Enabling or disabling specific sets of cookies will affect your experience.
              </p>

              <div className="space-y-4">
                {/* Strictly Necessary */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-red-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold text-red-900">
                      <ShieldCheck className="w-5 h-5" /> Strictly Necessary Cookies
                    </div>
                    <Badge variant="secondary" className="bg-white">Required</Badge>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-sm text-gray-600 mb-4">
                      These cookies enable website functionality and are automatically enabled when you use the Site. Essential for login, security, and shopping carts.
                    </p>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="text-sm font-medium text-gray-500">Always Active</span>
                      <Switch checked disabled />
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold text-blue-900">
                      <BarChart3 className="w-5 h-5" /> Analytics Cookies
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-sm text-gray-600 mb-4">
                      Analytics Cookies enable us to gather information to help us improve Our Site and your experience of it.
                    </p>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Enable Analytics</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                {/* Functional */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-green-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold text-green-900">
                      <Sliders className="w-5 h-5" /> Functional Cookies
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-sm text-gray-600 mb-4">
                      Allow the Site to remember the choices you make (like language or region) to provide enhanced personal features.
                    </p>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Enable Functional</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Save Preferences
                </Button>
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
                    <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-use" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                      <ArrowRight className="w-4 h-4" /> Terms of Use
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