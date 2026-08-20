import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import SEO from "@/components/SEO";
import { toast } from "sonner";

type Step = "credentials" | "code";
type Mode = "signin" | "signup" | "forgot";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  // While the second factor is pending we must not auto-redirect on the
  // short-lived password session.
  const challengeRef = useRef(false);

  useEffect(() => {
    if (!loading && session && !challengeRef.current) navigate("/admin", { replace: true });
  }, [loading, session, navigate]);

  const startChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    challengeRef.current = true;
    try {
      // Factor 1 — password.
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Confirm this address is approved for the admin area before going further.
      const { data: allowed } = await supabase.rpc("is_admin_allowed");
      if (allowed !== true) {
        await supabase.auth.signOut();
        throw new Error("This account is not approved for admin access.");
      }

      // Drop the password-only session, then require the emailed code.
      await supabase.auth.signOut();
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });
      if (otpError) throw otpError;

      setStep("code");
      toast.success("We emailed you a 6-digit verification code.");
    } catch (err) {
      challengeRef.current = false;
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code.trim(),
        type: "email",
      });
      if (error) throw error;
      challengeRef.current = false;
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "That code was not accepted");
    } finally {
      setBusy(false);
    }
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      toast.success("Account created. Confirm your email, then sign in.");
      setMode("signin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("If that account exists, a reset link is on its way.");
      setMode("signin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset email");
    } finally {
      setBusy(false);
    }
  };

  const heading =
    step === "code"
      ? "Verify it's you"
      : mode === "signin"
        ? "Team sign in"
        : mode === "signup"
          ? "Create team account"
          : "Reset your password";

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#0D0A1A" }}
    >
      <SEO
        title="Team Login | DigitalDynasty Imperium"
        description="Team access to the DigitalDynasty Imperium content manager."
        path="/admin/login"
        noindex
      />
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6">
          {step === "code" ? (
            <ShieldCheck className="w-6 h-6 text-primary-foreground" />
          ) : (
            <Lock className="w-6 h-6 text-primary-foreground" />
          )}
        </div>
        <h1 className="font-display text-2xl font-bold text-card-foreground mb-2">{heading}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {step === "code"
            ? `Enter the 6-digit code we sent to ${email}.`
            : "Content manager for DigitalDynasty Imperium. Access is restricted to approved accounts."}
        </p>

        {step === "code" ? (
          <form onSubmit={verifyCode} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="code">
                Verification code
              </label>
              <Input
                id="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              Verify and continue
            </Button>
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
              onClick={() => {
                challengeRef.current = false;
                setStep("credentials");
                setCode("");
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Start over
            </button>
          </form>
        ) : (
          <form
            onSubmit={mode === "signin" ? startChallenge : mode === "signup" ? signUp : sendReset}
            className="space-y-4"
          >
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="fullName">
                  Full name
                </label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "signin"
                ? "Continue"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
            </Button>
          </form>
        )}

        {step === "credentials" && (
          <div className="mt-5 flex flex-col gap-2 items-start">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
            {mode !== "forgot" && (
              <button
                type="button"
                className="text-sm text-muted-foreground hover:underline"
                onClick={() => setMode("forgot")}
              >
                Forgot your password?
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminLogin;
