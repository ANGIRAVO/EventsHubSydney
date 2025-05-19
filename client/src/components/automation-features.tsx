import { Button } from "@/components/ui/button";
import { Search, Link2, Brush, Rocket } from "lucide-react";

export default function AutomationFeatures() {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-3">Automate Your Social Media Workflow</h2>
        <p className="max-w-2xl mx-auto text-neutral-600">
          Our platform helps social media managers create seamless workflows between their favorite apps. Save time and boost engagement.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-3">Event Discovery</h3>
          <p className="text-neutral-600">
            Our automated scraping tools find the latest events in Sydney, perfect for your social media calendar.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-secondary/10 text-secondary rounded-full mb-4">
            <Link2 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-3">Custom Workflows</h3>
          <p className="text-neutral-600">
            Connect your favorite apps and automate content sharing across multiple platforms simultaneously.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-accent/10 text-accent rounded-full mb-4">
            <Brush className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-3">Brand Templates</h3>
          <p className="text-neutral-600">
            Create and customize templates to maintain consistent branding across all your social media posts.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Button className="px-6 py-3 h-12 bg-primary text-white font-medium hover:bg-primary-dark transition">
          <Rocket className="mr-2 h-5 w-5" />
          <span>Start Automating Today</span>
        </Button>
      </div>
    </section>
  );
}
