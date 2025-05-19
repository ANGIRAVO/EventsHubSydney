import { Link } from "wouter";
import { Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UpcomingEventsProps {
  events: Event[];
  isLoading: boolean;
  error: Error | null;
  onGetTickets: (event: Event) => void;
}

export default function UpcomingEvents({ events, isLoading, error, onGetTickets }: UpcomingEventsProps) {
  // Function to determine badge color based on category
  const getBadgeVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case 'comedy':
        return 'primary';
      case 'festival':
      case 'food':
        return 'secondary';
      case 'art':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800">Upcoming Events</h2>
          <Link href="/events/calendar">
            <a className="text-primary hover:text-primary-dark font-medium flex items-center gap-1">
              View calendar
              <Calendar className="ml-1 h-4 w-4" />
            </a>
          </Link>
        </div>
        
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load events. Please try again later.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition flex overflow-hidden">
                  <Skeleton className="w-32 h-auto hidden sm:block" />
                  <div className="p-4 flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <Skeleton className="h-4 w-2/5" />
                      <Skeleton className="h-5 w-1/5" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <div className="flex items-center justify-between mt-2">
                      <Skeleton className="h-5 w-1/4" />
                      <Skeleton className="h-9 w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition flex overflow-hidden">
                  <div className="w-32 h-auto hidden sm:block">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <Badge variant={getBadgeVariant(event.category)} className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">{event.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-neutral-800 font-semibold">{event.price}</span>
                      <Button 
                        variant="default" 
                        className="px-3 py-1.5 h-9 bg-accent text-white text-sm font-medium hover:bg-accent-dark transition"
                        onClick={() => onGetTickets(event)}
                      >
                        GET TICKETS
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-neutral-600">No upcoming events found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
