import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Music, Ticket, Wine } from "lucide-react";

interface FilterBarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  const handleCategoryClick = (category: string | null) => {
    onCategoryChange(selectedCategory === category ? null : category);
  };

  return (
    <div className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-neutral-700 font-medium hidden sm:inline">Filter by:</span>
            <div className="inline-flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === null ? "default" : "secondary"}
                size="sm"
                className={selectedCategory === null ? "bg-primary text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"} 
                onClick={() => handleCategoryClick(null)}
              >
                <Calendar className="w-4 h-4 mr-1" />
                <span>All Events</span>
              </Button>
              <Button 
                variant={selectedCategory === "Music" ? "default" : "secondary"}
                size="sm"
                className={selectedCategory === "Music" ? "bg-primary text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"} 
                onClick={() => handleCategoryClick("Music")}
              >
                <Music className="w-4 h-4 mr-1" />
                <span>Concerts</span>
              </Button>
              <Button 
                variant={selectedCategory === "Festival" ? "default" : "secondary"}
                size="sm"
                className={selectedCategory === "Festival" ? "bg-primary text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"} 
                onClick={() => handleCategoryClick("Festival")}
              >
                <Ticket className="w-4 h-4 mr-1" />
                <span>Festivals</span>
              </Button>
              <Button 
                variant={selectedCategory === "Food" ? "default" : "secondary"}
                size="sm"
                className={selectedCategory === "Food" ? "bg-primary text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"} 
                onClick={() => handleCategoryClick("Food")}
              >
                <Wine className="w-4 h-4 mr-1" />
                <span>Food & Drink</span>
              </Button>
            </div>
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-700 text-sm">Sort by:</span>
            <Select defaultValue="date-upcoming">
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-upcoming">Date: Upcoming</SelectItem>
                <SelectItem value="weekend">Date: This weekend</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
