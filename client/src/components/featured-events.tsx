import { Link } from "wouter";
import { Event } from "@shared/schema";
import EventCard from "./event-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowRight } from "lucide-react";

interface FeaturedEventsProps {
  events: Event[];
  isLoading: boolean;
  error: Error | null;
  onGetTickets: (event: Event) => void;
}

export default function FeaturedEvents({ events, isLoading, error, onGetTickets }: FeaturedEventsProps) {
  return (
    <section className="py-12 container mx-auto px-4" id="featured">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800">Featured Events</h2>
        <Link href="/events">
          <a className="text-primary hover:text-primary-dark font-medium flex items-center gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 flex flex-col flex-grow">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex items-center justify-between mt-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-9 w-1/3" />
                  </div>
                </div>
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onGetTickets={() => onGetTickets(event)} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-neutral-600">No featured events found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
