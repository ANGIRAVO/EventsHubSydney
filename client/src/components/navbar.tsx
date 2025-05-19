import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Heart, Menu } from "lucide-react";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

export default function Navbar({ searchTerm, onSearchChange }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-6 w-6" />
              <h1 className="text-xl font-semibold text-neutral-800">
                EventHub<span className="text-primary">Sydney</span>
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation and Search */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row w-full lg:w-auto gap-4 lg:items-center`}>
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <Input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-2 lg:mt-0">
              <Link href="/">
                <a className="text-primary font-medium hover:text-primary-dark transition">Home</a>
              </Link>
              <Link href="#featured">
                <a className="text-neutral-700 font-medium hover:text-primary transition">Featured</a>
              </Link>
              <Link href="#categories">
                <a className="text-neutral-700 font-medium hover:text-primary transition">Categories</a>
              </Link>
              <Link href="#help">
                <a className="text-neutral-700 font-medium hover:text-primary transition">Help</a>
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <Button variant="ghost" size="icon" className="text-neutral-700 hover:text-primary transition">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="default" className="bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
