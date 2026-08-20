import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Those passwords don't match.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. Please sign in again.");
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#0D0A1A" }}
    >
      <SEO
        title="Reset Password | DigitalDynasty Imperium"
        description="Set a new password for your DigitalDynasty Imperium team account."
        path="/reset-password"
        noindex
      />
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6">
          <KeyRound className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold text-card-foreground mb-2">
          Set a new password
        </h1>
        {!ready ? (
          <p className="text-sm text-muted-foreground">
            Open this page from the reset link in your email to continue.
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="newPassword">
                New password
              </label>
              <Input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="confirmPassword">
                Confirm new password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              Update password
            </Button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
