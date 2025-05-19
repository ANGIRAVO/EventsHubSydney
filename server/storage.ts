import { 
  users, type User, type InsertUser,
  events, type Event, type InsertEvent,
  emailSubscriptions, type EmailSubscription, type InsertEmailSubscription,
  workflows, type Workflow, type InsertWorkflow,
  templates, type Template, type InsertTemplate,
  ticketEmails, type TicketEmail, type InsertTicketEmail
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Event operations
  getEvent(id: number): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  getEventsByCategory(category: string): Promise<Event[]>;
  searchEvents(query: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;

  // Email subscription operations
  getEmailSubscription(id: number): Promise<EmailSubscription | undefined>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;

  // Workflow operations
  getWorkflow(id: number): Promise<Workflow | undefined>;
  getWorkflowsByUserId(userId: number): Promise<Workflow[]>;
  createWorkflow(workflow: InsertWorkflow): Promise<Workflow>;
  updateWorkflow(id: number, workflow: Partial<InsertWorkflow>): Promise<Workflow | undefined>;
  deleteWorkflow(id: number): Promise<boolean>;

  // Template operations
  getTemplate(id: number): Promise<Template | undefined>;
  getTemplatesByUserId(userId: number): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: number): Promise<boolean>;

  // Ticket email operations
  getTicketEmail(id: number): Promise<TicketEmail | undefined>;
  getTicketEmailsByEventId(eventId: number): Promise<TicketEmail[]>;
  createTicketEmail(ticketEmail: InsertTicketEmail): Promise<TicketEmail>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private emailSubscriptions: Map<number, EmailSubscription>;
  private workflows: Map<number, Workflow>;
  private templates: Map<number, Template>;
  private ticketEmails: Map<number, TicketEmail>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentEmailSubscriptionId: number;
  private currentWorkflowId: number;
  private currentTemplateId: number;
  private currentTicketEmailId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.emailSubscriptions = new Map();
    this.workflows = new Map();
    this.templates = new Map();
    this.ticketEmails = new Map();

    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentEmailSubscriptionId = 1;
    this.currentWorkflowId = 1;
    this.currentTemplateId = 1;
    this.currentTicketEmailId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.category.toLowerCase() === category.toLowerCase(),
    );
  }

  async searchEvents(query: string): Promise<Event[]> {
    const lowerCaseQuery = query.toLowerCase();
    return Array.from(this.events.values()).filter(
      (event) =>
        event.title.toLowerCase().includes(lowerCaseQuery) ||
        event.description.toLowerCase().includes(lowerCaseQuery) ||
        event.location.toLowerCase().includes(lowerCaseQuery),
    );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { 
      ...insertEvent, 
      id, 
      lastUpdated: new Date() 
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, updateEvent: Partial<InsertEvent>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;

    const updatedEvent: Event = { 
      ...event, 
      ...updateEvent, 
      lastUpdated: new Date() 
    };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }

  // Email subscription operations
  async getEmailSubscription(id: number): Promise<EmailSubscription | undefined> {
    return this.emailSubscriptions.get(id);
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    return Array.from(this.emailSubscriptions.values()).find(
      (subscription) => subscription.email === email,
    );
  }

  async createEmailSubscription(insertSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const id = this.currentEmailSubscriptionId++;
    const subscription: EmailSubscription = { 
      ...insertSubscription, 
      id, 
      subscribedAt: new Date() 
    };
    this.emailSubscriptions.set(id, subscription);
    return subscription;
  }

  // Workflow operations
  async getWorkflow(id: number): Promise<Workflow | undefined> {
    return this.workflows.get(id);
  }

  async getWorkflowsByUserId(userId: number): Promise<Workflow[]> {
    return Array.from(this.workflows.values()).filter(
      (workflow) => workflow.userId === userId,
    );
  }

  async createWorkflow(insertWorkflow: InsertWorkflow): Promise<Workflow> {
    const id = this.currentWorkflowId++;
    const workflow: Workflow = { 
      ...insertWorkflow, 
      id, 
      createdAt: new Date() 
    };
    this.workflows.set(id, workflow);
    return workflow;
  }

  async updateWorkflow(id: number, updateWorkflow: Partial<InsertWorkflow>): Promise<Workflow | undefined> {
    const workflow = this.workflows.get(id);
    if (!workflow) return undefined;

    const updatedWorkflow: Workflow = { 
      ...workflow, 
      ...updateWorkflow
    };
    this.workflows.set(id, updatedWorkflow);
    return updatedWorkflow;
  }

  async deleteWorkflow(id: number): Promise<boolean> {
    return this.workflows.delete(id);
  }

  // Template operations
  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getTemplatesByUserId(userId: number): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      (template) => template.userId === userId,
    );
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentTemplateId++;
    const template: Template = { 
      ...insertTemplate, 
      id, 
      createdAt: new Date() 
    };
    this.templates.set(id, template);
    return template;
  }

  async updateTemplate(id: number, updateTemplate: Partial<InsertTemplate>): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;

    const updatedTemplate: Template = { 
      ...template, 
      ...updateTemplate
    };
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<boolean> {
    return this.templates.delete(id);
  }

  // Ticket email operations
  async getTicketEmail(id: number): Promise<TicketEmail | undefined> {
    return this.ticketEmails.get(id);
  }

  async getTicketEmailsByEventId(eventId: number): Promise<TicketEmail[]> {
    return Array.from(this.ticketEmails.values()).filter(
      (ticketEmail) => ticketEmail.eventId === eventId,
    );
  }

  async createTicketEmail(insertTicketEmail: InsertTicketEmail): Promise<TicketEmail> {
    const id = this.currentTicketEmailId++;
    const ticketEmail: TicketEmail = { 
      ...insertTicketEmail, 
      id, 
      createdAt: new Date() 
    };
    this.ticketEmails.set(id, ticketEmail);
    return ticketEmail;
  }
}

export const storage = new MemStorage();
