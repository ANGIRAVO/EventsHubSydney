import { Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: Event;
  onGetTickets: () => void;
}

export default function EventCard({ event, onGetTickets }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">
      <div className="relative h-48">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        {event.popular && (
          <Badge className="absolute top-0 right-0 bg-accent text-white m-3">
            Popular
          </Badge>
        )}
        {event.isNew && (
          <Badge className="absolute top-0 right-0 bg-primary text-white m-3">
            New
          </Badge>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{event.date}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">{event.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 flex-grow">{event.description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-neutral-800 font-semibold">{event.price}</span>
          <Button 
            variant="default" 
            className="px-3 py-1.5 h-9 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition"
            onClick={onGetTickets}
          >
            GET TICKETS
          </Button>
        </div>
      </div>
    </div>
  );
}
