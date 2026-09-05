import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "ddi_visitor_captured_v1";

const schema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(120, { message: "Name must be less than 120 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Enter a valid contact number" })
    .max(30, { message: "Contact number is too long" }),
});

const VisitorCaptureDialog = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!agreed) {
      setErrors({ agreed: "You must accept the Privacy Policy and Terms of Service" });
      return;
    }

    const parsed = schema.safeParse({ full_name: fullName, email, phone });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("visitor_leads").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      agreed_to_terms: true,
      agreed_at: new Date().toISOString(),
      newsletter_opt_in: newsletter,
      source_path: window.location.pathname,
      referrer: document.referrer || "",
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Something went wrong",
        description: "We couldn't save your details. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }

    toast({
      title: "Welcome to Digitaldynasty Imperium",
      description: newsletter
        ? "You're in. Watch your inbox for updates and offers."
        : "Thanks — enjoy exploring our programs.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md max-h-[90vh] overflow-y-auto [&>button]:hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Welcome to Digitaldynasty Imperium
          </DialogTitle>
          <DialogDescription>
            Tell us who you are so we can guide you to the right program.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visitor-name">Full name</Label>
            <Input
              id="visitor-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ada Obi"
              maxLength={120}
              autoComplete="name"
            />
            {errors.full_name && (
              <p className="text-sm text-destructive">{errors.full_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitor-email">Email address</Label>
            <Input
              id="visitor-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={255}
              autoComplete="email"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitor-phone">Contact number</Label>
            <Input
              id="visitor-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 800 000 0000"
              maxLength={30}
              autoComplete="tel"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <Checkbox
                id="visitor-agree"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <Label
                htmlFor="visitor-agree"
                className="text-sm font-normal leading-relaxed text-muted-foreground"
              >
                I agree to the{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Terms of Service
                </a>
                . <span className="text-destructive">*</span>
              </Label>
            </div>
            {errors.agreed && <p className="text-sm text-destructive">{errors.agreed}</p>}

            <div className="flex items-start gap-3">
              <Checkbox
                id="visitor-newsletter"
                checked={newsletter}
                onCheckedChange={(v) => setNewsletter(v === true)}
                className="mt-0.5"
              />
            <Label
                htmlFor="visitor-newsletter"
                className="text-sm font-normal leading-relaxed text-muted-foreground"
              >
                Subscribe me to updates, promotions, and educational content from DDI.
              </Label>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Continue"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorCaptureDialog;
