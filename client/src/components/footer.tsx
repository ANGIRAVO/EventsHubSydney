import { Link } from "wouter";
import { Calendar, Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-secondary h-6 w-6" />
              <h3 className="text-xl font-semibold">EventHub<span className="text-secondary">Sydney</span></h3>
            </div>
            <p className="text-neutral-400 mb-4">
              The ultimate event automation platform for social media managers in Sydney.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-secondary transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-neutral-400 hover:text-white transition">Home</a></Link></li>
              <li><Link href="#featured"><a className="text-neutral-400 hover:text-white transition">Featured Events</a></Link></li>
              <li><Link href="#upcoming"><a className="text-neutral-400 hover:text-white transition">Upcoming Events</a></Link></li>
              <li><Link href="/automation"><a className="text-neutral-400 hover:text-white transition">Automation Tools</a></Link></li>
              <li><Link href="/faq"><a className="text-neutral-400 hover:text-white transition">FAQs</a></Link></li>
            </ul>
          </div>
          
          {/* Event Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Event Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/category/concerts"><a className="text-neutral-400 hover:text-white transition">Concerts & Shows</a></Link></li>
              <li><Link href="/category/festivals"><a className="text-neutral-400 hover:text-white transition">Festivals</a></Link></li>
              <li><Link href="/category/food"><a className="text-neutral-400 hover:text-white transition">Food & Drink</a></Link></li>
              <li><Link href="/category/art"><a className="text-neutral-400 hover:text-white transition">Art & Culture</a></Link></li>
              <li><Link href="/category/sports"><a className="text-neutral-400 hover:text-white transition">Sports</a></Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary mt-1 h-5 w-5 shrink-0" />
                <span className="text-neutral-400">123 George Street, Sydney, NSW 2000, Australia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary h-5 w-5 shrink-0" />
                <a href="mailto:info@eventhubsydney.com" className="text-neutral-400 hover:text-white transition">info@eventhubsydney.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary h-5 w-5 shrink-0" />
                <a href="tel:+61234567890" className="text-neutral-400 hover:text-white transition">+61 2 3456 7890</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EventHub Sydney. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy"><a className="text-neutral-500 text-sm hover:text-white transition">Privacy Policy</a></Link>
              <Link href="/terms"><a className="text-neutral-500 text-sm hover:text-white transition">Terms of Service</a></Link>
              <Link href="/cookies"><a className="text-neutral-500 text-sm hover:text-white transition">Cookie Policy</a></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
