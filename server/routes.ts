import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scrapeAllEvents, initializeEvents } from "./scraper";
import cron from "node-cron";
import { insertEventSchema, insertEmailSubscriptionSchema, insertTicketEmailSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize events on server start
  await initializeEvents();

  // Schedule event scraping to run once a day at midnight
  cron.schedule("0 0 * * *", () => {
    console.log("Running scheduled event scraping job");
    scrapeAllEvents().catch(err => {
      console.error("Error in scheduled event scraping:", err);
    });
  });

  // API routes
  app.get("/api/events", async (req: Request, res: Response) => {
    try {
      const searchQuery = req.query.search as string | undefined;
      const category = req.query.category as string | undefined;
      
      let events;
      
      if (searchQuery) {
        events = await storage.searchEvents(searchQuery);
      } else if (category) {
        events = await storage.getEventsByCategory(category);
      } else {
        events = await storage.getAllEvents();
      }
      
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req: Request, res: Response) => {
    try {
      const eventId = parseInt(req.params.id);
      
      if (isNaN(eventId)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const event = await storage.getEvent(eventId);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req: Request, res: Response) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const subscriptionData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscriptionByEmail(subscriptionData.email);
      
      if (existingSubscription) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      
      const subscription = await storage.createEmailSubscription(subscriptionData);
      res.status(201).json({ message: "Subscription successful" });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  app.post("/api/ticket-emails", async (req: Request, res: Response) => {
    try {
      const ticketEmailData = insertTicketEmailSchema.parse(req.body);
      
      // Ensure event exists
      const event = await storage.getEvent(ticketEmailData.eventId);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      const ticketEmail = await storage.createTicketEmail(ticketEmailData);
      
      // Return ticket URL for redirection
      res.status(201).json({ 
        message: "Email captured successfully",
        ticketUrl: event.ticketUrl 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error capturing email:", error);
      res.status(500).json({ message: "Failed to capture email" });
    }
  });

  // Manual trigger for event scraping (for testing and admin purposes)
  app.post("/api/scrape-events", async (req: Request, res: Response) => {
    try {
      await scrapeAllEvents();
      res.json({ message: "Event scraping completed successfully" });
    } catch (error) {
      console.error("Error in manual event scraping:", error);
      res.status(500).json({ message: "Failed to scrape events" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
