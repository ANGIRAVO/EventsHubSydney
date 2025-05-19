import { useState } from "react";
import Navbar from "@/components/navbar";
import FilterBar from "@/components/filter-bar";
import HeroSection from "@/components/hero-section";
import FeaturedEvents from "@/components/featured-events";
import UpcomingEvents from "@/components/upcoming-events";
import AutomationFeatures from "@/components/automation-features";
import EmailSubscription from "@/components/email-subscription";
import EmailCaptureModal from "@/components/email-capture-modal";
import Footer from "@/components/footer";
import { useEvents } from "@/hooks/use-events";
import { Event } from "@shared/schema";

export default function Home() {
  const { events, isLoading, error } = useEvents();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Function to handle the GET TICKETS button click
  const handleGetTickets = (event: Event) => {
    setSelectedEvent(event);
    setShowEmailModal(true);
  };

  // Filter events based on search term and category
  const filteredEvents = events
    ? events.filter((event) => {
        const matchesSearch =
          searchTerm === "" ||
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === null || event.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
    : [];

  // Split events into featured and upcoming
  const featuredEvents = filteredEvents.filter(event => event.popular || event.isNew);
  const upcomingEvents = filteredEvents.filter(event => !event.popular && !event.isNew);

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterBar 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <HeroSection />
      <FeaturedEvents 
        events={featuredEvents}
        isLoading={isLoading}
        error={error} 
        onGetTickets={handleGetTickets}
      />
      <UpcomingEvents 
        events={upcomingEvents}
        isLoading={isLoading}
        error={error}
        onGetTickets={handleGetTickets}
      />
      <AutomationFeatures />
      <EmailSubscription />
      <EmailCaptureModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        event={selectedEvent}
      />
      <Footer />
    </>
  );
}
