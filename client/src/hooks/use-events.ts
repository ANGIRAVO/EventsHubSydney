import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";

export function useEvents() {
  const { 
    data: events, 
    isLoading, 
    error 
  } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  return {
    events,
    isLoading,
    error
  };
}
