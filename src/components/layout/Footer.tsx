"use client";

import Link from "next/link";
import Image from "next/image";
import { Store, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Demo Store", href: "/demo" },
    { name: "Templates", href: "/templates" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Help Center", href: "/help" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Use", href: "/terms-of-use" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Return Policy", href: "/return-policy" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://facebook.com/agmstorebuilder", 
      icon: Facebook 
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com/agmstorebuilder", 
      icon: Twitter 
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com/agmstorebuilder", 
      icon: Instagram 
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "support@agmtechpluse.net",
      href: "mailto:support@agmtechpluse.net",
    },
    {
      icon: Phone,
      text: "+234 800 123 4567",
      href: "tel:+2348001234567",
    },
    {
      icon: MapPin,
      text: "Yenagoa, Bayelsa State, Nigeria",
      href: null,
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column - Takes 2 columns on large screens */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                AGM Store Builder
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Empowering Nigerian entrepreneurs to build professional online stores in minutes. 
              No coding required, instant payouts, mobile-first design.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
                  <item.icon className="h-4 w-4 text-gray-400" />
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className="hover:text-primary-600 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-primary-500 flex items-center justify-center transition-all group"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600 text-center sm:text-left">
              &copy; {currentYear} AGM Store Builder. All rights reserved.
            </p>

            {/* Additional Links */}
            
          </div>

          {/* Made in Nigeria Badge */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600">
              <span>🇳🇬</span>
              <span className="font-medium">Proudly Made in Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
