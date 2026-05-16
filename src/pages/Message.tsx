import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

const Message = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: searchParams.get("subject") || "",
    message: searchParams.get("message") || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-to-sheets', {
        body: {
          ...formData,
          timestamp: new Date().toISOString(),
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-8 animate-scale-in">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Message Sent Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
              </p>
              <Button variant="hero" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Leave a Message | DigitalDynasty Imperium"
        description="Send DigitalDynasty Imperium a direct message. We respond to inquiries within 24 hours."
        path="/message"
      />
      {/* Hero */}
      <section className="py-20 gradient-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Leave Us a{" "}
              <span className="gradient-text">Message</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a question, feedback, or want to learn more about our courses? Fill out the form below and we'll get back to you soon.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-card p-8 md:p-10 rounded-2xl shadow-card space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 xxx xxx xxxx"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Course Inquiry"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                  className="min-h-[160px] resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-muted-foreground text-sm">
                By submitting this form, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Message;
