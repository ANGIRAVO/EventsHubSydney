import { Button } from "@/components/ui/button";
import { WandSparkles, Calendar } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-neutral-800 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-neutral-900/40" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Discover Sydney's Best Events</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Automate your social media content with our curated event listings. Perfect for social media managers to create engaging posts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="px-5 py-3 h-12 bg-secondary font-medium text-neutral-900 hover:bg-secondary-dark transition"
            >
              <WandSparkles className="mr-2 h-5 w-5" />
              <span>Create Automation</span>
            </Button>
            <Button 
              variant="outline" 
              className="px-5 py-3 h-12 bg-white/20 backdrop-blur-sm text-white border-white/30 font-medium hover:bg-white/30 transition"
            >
              <Calendar className="mr-2 h-5 w-5" />
              <span>View All Events</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
