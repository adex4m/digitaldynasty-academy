import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, ShieldCheck, ExternalLink, UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import SEO from "@/components/SEO";
import CollectionEditor from "@/components/admin/CollectionEditor";
import { toast } from "sonner";
import ddiLogo from "@/assets/ddi-logo-mark.png";

const courseFields = [
  { key: "title", label: "Course title", type: "text" as const },
  { key: "slug", label: "URL slug", type: "text" as const, help: "Lowercase, dashes only — e.g. video-editing" },
  { key: "category", label: "Category badge", type: "text" as const },
  { key: "description", label: "Description", type: "textarea" as const },
  { key: "why_take", label: "Why take this course", type: "list" as const, help: "One benefit per line" },
  { key: "beginner_timeline", label: "Beginner timeline", type: "text" as const },
  { key: "intermediate_timeline", label: "Intermediate timeline", type: "text" as const },
  { key: "thumbnail_url", label: "Thumbnail", type: "image" as const },
  { key: "enroll_url", label: "Standard Paid enrollment link", type: "text" as const },
  { key: "is_custom_request", label: "Custom request card (no enroll pop-up)", type: "bool" as const },
];

const bootcampFields = [
  { key: "title", label: "Bootcamp title", type: "text" as const },
  { key: "description", label: "Description", type: "textarea" as const },
  { key: "highlights", label: "Highlights", type: "list" as const, help: "One highlight per line" },
  { key: "image_url", label: "Image", type: "image" as const },
  { key: "register_url", label: "Register link (optional)", type: "text" as const, help: "Leave empty to show the 'Contact us for details' button" },
];

const tierFields = [
  { key: "name", label: "Tier label", type: "text" as const, placeholder: "Tier 1" },
  { key: "title", label: "Package name", type: "text" as const, placeholder: "Basic Access" },
  { key: "price", label: "Price text", type: "text" as const, placeholder: "FREE" },
  { key: "features", label: "Features", type: "list" as const, help: "One feature per line" },
  { key: "is_highlighted", label: "Mark as Most Popular", type: "bool" as const },
  { key: "register_url", label: "Register link", type: "text" as const },
];

const resourceFields = [
  { key: "title", label: "Category title", type: "text" as const },
  { key: "description", label: "Description", type: "textarea" as const },
  {
    key: "icon",
    label: "Icon name",
    type: "text" as const,
    help: "One of: GraduationCap, Video, Wrench, FileText, Lightbulb, BookOpen",
  },
  { key: "items", label: "Resources in this category", type: "items" as const },
  { key: "cta_label", label: "Button label (optional)", type: "text" as const, placeholder: "Explore" },
  { key: "cta_url", label: "Button link (optional)", type: "text" as const },
];

const SettingsPanel = () => {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").order("key");
      if (error) throw error;
      return data ?? [];
    },
  });

  const save = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase.from("site_settings").update({ value }).eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Link updated");
      qc.invalidateQueries({ queryKey: ["admin", "site_settings"] });
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Shared call-to-action links used across the website.
      </p>
      {(data ?? []).map((row) => (
        <div key={row.key} className="p-4 rounded-lg border border-border bg-card space-y-2">
          <label className="text-sm font-medium text-card-foreground" htmlFor={row.key}>
            {row.label || row.key}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id={row.key}
              value={draft[row.key] ?? row.value}
              onChange={(e) => setDraft({ ...draft, [row.key]: e.target.value })}
            />
            <Button
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => save.mutate({ key: row.key, value: draft[row.key] ?? row.value })}
            >
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TeamPanel = () => {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "team"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("list_team");
      if (error) throw error;
      return data ?? [];
    },
  });

  const grant = useMutation({
    mutationFn: async () => {
      const member = (data ?? []).find(
        (m) => (m.email ?? "").toLowerCase() === email.trim().toLowerCase()
      );
      if (!member) {
        throw new Error(
          "No account found with that email. Ask them to create an account at /admin/login first."
        );
      }
      const { error } = await supabase.from("user_roles").insert({ user_id: member.user_id, role });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Access granted");
      setEmail("");
      qc.invalidateQueries({ queryKey: ["admin", "team"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const revoke = useMutation({
    mutationFn: async ({ userId, r }: { userId: string; r: string }) => {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", r as "admin" | "editor");
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Access removed");
      qc.invalidateQueries({ queryKey: ["admin", "team"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg border border-border bg-card space-y-3">
        <h3 className="font-display font-semibold text-card-foreground">Give someone access</h3>
        <p className="text-sm text-muted-foreground">
          They must first create an account at <span className="font-medium">/admin/login</span>. Then grant
          them a role here.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="teammate@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select value={role} onValueChange={(v) => setRole(v as "admin" | "editor")}>
            <SelectTrigger className="sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full sm:w-auto"
            onClick={() => grant.mutate()}
            disabled={!email || grant.isPending}
          >
            <UserPlus className="w-4 h-4" /> Grant
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Editors can manage all content. Admins can also manage the team.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading team…
        </div>
      ) : (
        <div className="space-y-3">
          {(data ?? []).map((member) => (
            <div
              key={member.user_id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border border-border bg-card"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground break-words">
                  {member.full_name || member.email}
                </p>
                <p className="text-sm text-muted-foreground break-all">{member.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {((member.roles ?? []) as string[]).length === 0 && (
                  <Badge variant="secondary">No access</Badge>
                )}
                {((member.roles ?? []) as string[]).map((r) => (
                  <Badge key={r} className="flex items-center gap-1">
                    {r}
                    <button
                      type="button"
                      aria-label={`Remove ${r} role`}
                      onClick={() => revoke.mutate({ userId: member.user_id, r })}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AllowlistPanel = () => {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "allowlist"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin_allowlist").select("*").order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("admin_allowlist")
        .insert({ email: email.trim().toLowerCase(), note });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Email approved for admin access");
      setEmail("");
      setNote("");
      qc.invalidateQueries({ queryKey: ["admin", "allowlist"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (addr: string) => {
      const { error } = await supabase.from("admin_allowlist").delete().eq("email", addr);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Email removed");
      qc.invalidateQueries({ queryKey: ["admin", "allowlist"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="p-4 rounded-lg border border-border bg-card space-y-3">
      <h3 className="font-display font-semibold text-card-foreground">Approved admin emails</h3>
      <p className="text-sm text-muted-foreground">
        Only these email addresses can reach the admin area (existing team members always keep their
        access). Add a second address you control so you can never be locked out.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="owner@digitaldynasty.academy"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <Button
          className="w-full sm:w-auto"
          onClick={() => add.mutate()}
          disabled={!email || add.isPending}
        >
          <UserPlus className="w-4 h-4" /> Approve
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="space-y-2 pt-1">
          {(data ?? []).map((row) => (
            <div
              key={row.email}
              className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2"
            >
              <div className="min-w-0">
                <p className="text-sm text-card-foreground break-all">{row.email}</p>
                {row.note && <p className="text-xs text-muted-foreground">{row.note}</p>}
              </div>
              <button
                type="button"
                aria-label={`Remove ${row.email}`}
                onClick={() => remove.mutate(row.email)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AccountPanel = () => {
  const { user, signOut } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState<"email" | "password" | null>(null);

  const changeEmail = async () => {
    setBusy("email");
    const { error } = await supabase.auth.updateUser(
      { email: newEmail.trim() },
      { emailRedirectTo: `${window.location.origin}/admin` }
    );
    setBusy(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(
      "Confirmation links sent to both your current and new address. The change applies once confirmed."
    );
    setNewEmail("");
  };

  const changePassword = async () => {
    if (password !== confirm) {
      toast.error("Those passwords don't match.");
      return;
    }
    setBusy("password");
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    setPassword("");
    setConfirm("");
    toast.success("Password updated. Signing you out so you can sign in with it.");
    await signOut();
  };

  return (
    <div className="space-y-4 max-w-xl">
      <div className="p-4 rounded-lg border border-border bg-card space-y-3">
        <h3 className="font-display font-semibold text-card-foreground">Email address</h3>
        <p className="text-sm text-muted-foreground break-all">
          Currently signed in as {user?.email}
        </p>
        <Input
          placeholder="new@digitaldynasty.academy"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Remember to also approve the new address under Team → Approved admin emails.
        </p>
        <Button
          className="w-full sm:w-auto"
          onClick={changeEmail}
          disabled={!newEmail || busy === "email"}
        >
          {busy === "email" && <Loader2 className="w-4 h-4 animate-spin" />}
          Change email
        </Button>
      </div>

      <div className="p-4 rounded-lg border border-border bg-card space-y-3">
        <h3 className="font-display font-semibold text-card-foreground">Password</h3>
        <Input
          type="password"
          placeholder="New password"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <Button
          className="w-full sm:w-auto"
          onClick={changePassword}
          disabled={!password || busy === "password"}
        >
          {busy === "password" && <Loader2 className="w-4 h-4 animate-spin" />}
          Update password
        </Button>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const { session, loading, isStaff, isAdmin, refreshRoles, signOut } = useAuth();
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/login", { replace: true });
  }, [loading, session, navigate]);

  const claimAdmin = async () => {
    setClaiming(true);
    const { data, error } = await supabase.rpc("claim_first_admin");
    setClaiming(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) {
      await refreshRoles();
      toast.success("You are now the site admin.");
    } else {
      toast.error("An admin already exists. Ask them to grant you access.");
    }
  };

  if (loading || !session) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0D0A1A" }}>
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Content Manager | DigitalDynasty Imperium"
        description="Manage courses, bootcamps and resources for DigitalDynasty Imperium."
        path="/admin"
        noindex
      />

      <header
        className="sticky top-0 z-40 border-b"
        style={{ backgroundColor: "#0D0A1A", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src={ddiLogo} alt="DigitalDynasty Imperium" className="h-8 w-auto" />
            <span
              className="font-display font-semibold truncate"
              style={{ color: "#FFFFFF" }}
            >
              Content Manager
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden sm:block">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4" /> View site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} style={{ color: "#FFFFFF" }}>
              <LogOut className="w-4 h-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {!isStaff ? (
          <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-card-foreground mb-3">
              No access yet
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Your account ({session.user.email}) doesn't have content permissions yet. If you're the site
              owner setting this up for the first time, claim admin access below. Otherwise ask an admin to
              grant you access.
            </p>
            <Button onClick={claimAdmin} disabled={claiming} className="w-full sm:w-auto">
              {claiming && <Loader2 className="w-4 h-4 animate-spin" />}
              Claim admin access
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Manage your content
              </h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Changes go live on the website as soon as you save.
              </p>
            </div>

            <Tabs defaultValue="courses">
              <div className="overflow-x-auto pb-2">
                <TabsList>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="bootcamps">Bootcamps</TabsTrigger>
                  <TabsTrigger value="tiers">Bootcamp tiers</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="links">CTA links</TabsTrigger>
                  {isAdmin && <TabsTrigger value="team">Team</TabsTrigger>}
                </TabsList>
              </div>

              <TabsContent value="courses" className="mt-6">
                <CollectionEditor
                  table="courses"
                  singular="Course"
                  titleKey="title"
                  subtitleKey="description"
                  fields={courseFields}
                  defaults={{
                    title: "",
                    slug: "",
                    category: "",
                    description: "",
                    why_take: [],
                    beginner_timeline: "5 weeks + 3 weeks practical",
                    intermediate_timeline: "Custom (based on your goals)",
                    thumbnail_url: null,
                    enroll_url: "",
                    is_custom_request: false,
                  }}
                />
              </TabsContent>

              <TabsContent value="bootcamps" className="mt-6">
                <CollectionEditor
                  table="bootcamps"
                  singular="Bootcamp"
                  titleKey="title"
                  subtitleKey="description"
                  fields={bootcampFields}
                  defaults={{
                    title: "",
                    description: "",
                    highlights: [],
                    image_url: null,
                    register_url: "",
                    status: "contact",
                  }}
                />
              </TabsContent>

              <TabsContent value="tiers" className="mt-6">
                <CollectionEditor
                  table="bootcamp_tiers"
                  singular="Tier"
                  titleKey="title"
                  subtitleKey="price"
                  fields={tierFields}
                  defaults={{
                    name: "",
                    title: "",
                    price: "",
                    features: [],
                    is_highlighted: false,
                    register_url: "",
                  }}
                />
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <CollectionEditor
                  table="resource_categories"
                  singular="Resource category"
                  titleKey="title"
                  subtitleKey="description"
                  fields={resourceFields}
                  defaults={{
                    title: "",
                    description: "",
                    icon: "BookOpen",
                    items: [],
                    cta_label: "",
                    cta_url: "",
                  }}
                />
              </TabsContent>

              <TabsContent value="links" className="mt-6">
                <SettingsPanel />
              </TabsContent>

              {isAdmin && (
                <TabsContent value="team" className="mt-6">
                  <TeamPanel />
                </TabsContent>
              )}
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
