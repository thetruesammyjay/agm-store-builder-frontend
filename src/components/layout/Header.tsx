"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { Menu, LogIn } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Demo", href: "/demo" },
  ];

  return (
    // Changed 'sticky' to 'fixed' to ensure it remains static at the top during scroll
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-200">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 mx-auto">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
          <div className="relative flex items-center">
             {/* Desktop Logo */}
             <div className="hidden md:block relative w-32 h-8">
               <Image 
                 src="/logo.svg" 
                 alt="AGM Store Builder" 
                 fill
                 className="object-contain object-left transition-transform group-hover:scale-105"
                 priority
               />
             </div>
             
             {/* Mobile Logo - Updated to use logo.svg */}
             <div className="md:hidden relative w-24 h-8">
                <Image 
                   src="/logo.svg" 
                   alt="AGM" 
                   fill
                   className="object-contain object-left"
                   priority
                />
             </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-md shadow-primary-200 hover:shadow-lg transition-all rounded-full px-6">
              Create Store
            </Button>
          </Link>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-900 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-[300px] bg-white text-gray-900 border-l border-gray-200 p-0 flex flex-col"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Main site navigation</SheetDescription>

              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="relative w-24 h-8">
                  <Image 
                    src="/logo.svg" 
                    alt="AGM" 
                    fill 
                    className="object-contain object-left" 
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-xl transition-all flex items-center justify-between group"
                    >
                      {link.name}
                      <span className="text-gray-400 group-hover:text-primary-400 transition-colors">→</span>
                    </Link>
                  ))}
                </nav>
              </div>
                
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
                <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full block">
                  <Button className="w-full h-12 text-base bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-md">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full block">
                  <Button variant="outline" className="w-full h-12 text-base border-gray-200 text-gray-900 hover:bg-white rounded-xl">
                    <LogIn className="w-4 h-4 mr-2" /> Log in
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
