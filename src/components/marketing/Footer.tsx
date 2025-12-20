import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="relative w-32 h-8">
              <Image src="/logo.svg" alt="AGM" fill className="object-contain object-left" />
            </div>
            <p className="text-gray-500 leading-relaxed">
              Empowering Nigerian entrepreneurs with simple, powerful e-commerce tools. Build your dream store today.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/features" className="hover:text-primary-600">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary-600">Pricing</Link></li>
              <li><Link href="/templates" className="hover:text-primary-600">Templates</Link></li>
              <li><Link href="/demo" className="hover:text-primary-600">Demo Store</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/about" className="hover:text-primary-600">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary-600">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-primary-600">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary-600">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/help" className="hover:text-primary-600">Help Center</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-primary-600">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-primary-600">Return Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} AGM Store Builder. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}