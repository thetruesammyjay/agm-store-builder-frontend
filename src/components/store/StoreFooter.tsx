import Link from "next/link";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import type { Store } from "@/types";

interface StoreFooterProps {
  store: Store;
}

export function StoreFooter({ store }: StoreFooterProps) {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{store.displayName}</h3>
            {store.description && (
              <p className="text-sm text-gray-600 max-w-xs mx-auto md:mx-0">
                {store.description}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href={`/store/${store.username}`} className="hover:underline">Home</Link></li>
              <li><Link href={`/store/${store.username}/about`} className="hover:underline">About Us</Link></li>
              <li><Link href={`/store/${store.username}/track`} className="hover:underline">Track Order</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Connect With Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {store.socialLinks?.instagram && (
                <a href={store.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-pink-600">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {store.socialLinks?.twitter && (
                <a href={store.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {store.socialLinks?.facebook && (
                <a href={store.socialLinks.facebook} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {store.socialLinks?.whatsapp && (
                <a href={`https://wa.me/${store.socialLinks.whatsapp}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-500">
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} {store.displayName}. All rights reserved.</p>
          <p className="mt-2">Powered by <Link href="/" className="font-medium text-gray-500 hover:text-primary-600">AGM Store Builder</Link></p>
        </div>
      </div>
    </footer>
  );
}