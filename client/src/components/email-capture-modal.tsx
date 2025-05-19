import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Event } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const emailCaptureSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  createWorkflow: z.boolean().default(false),
});

type EmailCaptureFormValues = z.infer<typeof emailCaptureSchema>;

export default function EmailCaptureModal({ isOpen, onClose, event }: EmailCaptureModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmailCaptureFormValues>({
    resolver: zodResolver(emailCaptureSchema),
    defaultValues: {
      email: "",
      createWorkflow: false,
    },
  });

  const emailCaptureMutation = useMutation({
    mutationFn: async (data: EmailCaptureFormValues) => {
      if (!event) throw new Error("No event selected");
      return apiRequest("POST", "/api/ticket-emails", {
        email: data.email,
        eventId: event.id,
        createWorkflow: data.createWorkflow,
      });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      toast({
        title: "Success!",
        description: "Your email has been captured. Redirecting to tickets...",
        variant: "default",
      });
      
      // Reset form
      form.reset();
      setIsSubmitting(false);
      
      // Close modal
      onClose();
      
      // Redirect to ticket URL after a short delay
      setTimeout(() => {
        if (event) {
          window.open(event.ticketUrl, "_blank");
        }
      }, 500);
    },
    onError: (error) => {
      console.error("Email capture error:", error);
      toast({
        title: "Failed to process",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: EmailCaptureFormValues) => {
    setIsSubmitting(true);
    emailCaptureMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-neutral-800">One more step!</DialogTitle>
          <DialogDescription>
            Enter your email to create your workflow and get redirected to purchase tickets.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      type="email" 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="createWorkflow"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-neutral-600">
                      Create a workflow for future events like this
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="px-5 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Continue to Tickets"}
              </Button>
            </div>
          </form>
        </Form>
        
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
