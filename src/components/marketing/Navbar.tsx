"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"; // Added Title/Desc for accessibility fix
import { Menu, LogIn } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-32 h-8">
            <Image 
              src="/logo.svg" 
              alt="AGM Store Builder" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-700 hover:text-primary-600">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              {/* Accessibility Fix */}
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <SheetDescription className="sr-only">Navigation links</SheetDescription>

              <div className="flex flex-col gap-8 mt-8">
                <div className="relative w-32 h-8">
                  <Image src="/logo.svg" alt="AGM" fill className="object-contain object-left" />
                </div>
                
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-gray-900 hover:text-primary-600"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-12 justify-start gap-2">
                      <LogIn className="h-4 w-4" /> Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-12 bg-primary-600 text-white">
                      Create Free Store
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}