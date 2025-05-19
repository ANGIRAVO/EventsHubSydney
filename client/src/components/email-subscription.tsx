import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const subscriptionSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

export default function EmailSubscription() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: SubscriptionFormValues) => {
      return apiRequest("POST", "/api/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription successful!",
        description: "You'll now receive weekly updates on Sydney's hottest events.",
        variant: "default",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: SubscriptionFormValues) => {
    setIsSubmitting(true);
    subscriptionMutation.mutate(data);
  };

  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Never Miss an Event</h2>
          <p className="text-white/80 mb-6">
            Subscribe to get weekly updates on the hottest events in Sydney, perfect for your social media content.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        className="px-4 py-3 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-white/90" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="px-5 py-3 h-12 bg-secondary text-neutral-900 font-medium rounded-lg hover:bg-secondary-dark transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
          
          <p className="text-white/60 text-sm mt-3">We'll never share your email. Unsubscribe any time.</p>
        </div>
      </div>
    </section>
  );
}
