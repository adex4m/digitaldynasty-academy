import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ImageUploader from "@/components/admin/ImageUploader";

export type FieldType = "text" | "textarea" | "list" | "bool" | "number" | "image" | "items";

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
}

interface CollectionEditorProps {
  table: string;
  singular: string;
  titleKey: string;
  subtitleKey?: string;
  fields: Field[];
  defaults: Record<string, unknown>;
}

type Row = Record<string, any>;

// The admin editor works across several tables, so it uses an untyped client view.
const db = supabase as unknown as { from: (table: string) => any };

const CollectionEditor = ({
  table,
  singular,
  titleKey,
  subtitleKey,
  fields,
  defaults,
}: CollectionEditorProps) => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as never)
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as Row[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", table] });
    qc.invalidateQueries({ queryKey: [table] });
  };

  const save = useMutation({
    mutationFn: async (row: Row) => {
      const payload: Row = {};
      fields.forEach((f) => {
        payload[f.key] = row[f.key] ?? null;
      });
      payload.sort_order = Number(row.sort_order ?? 0);
      payload.is_published = row.is_published ?? true;

      if (row.id) {
        const { error } = await db.from(table).update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await db.from(table).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(`${singular} saved`);
      setEditing(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`${singular} deleted`);
      setDeleteId(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const togglePublish = useMutation({
    mutationFn: async (row: Row) => {
      const { error } = await supabase
        .from(table as never)
        .update({ is_published: !row.is_published })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const setField = (key: string, value: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev));

  const renderField = (field: Field) => {
    const value = editing?.[field.key];
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            rows={4}
            value={(value as string) ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => setField(field.key, e.target.value)}
          />
        );
      case "list":
        return (
          <Textarea
            rows={4}
            value={Array.isArray(value) ? value.join("\n") : ""}
            placeholder="One item per line"
            onChange={(e) =>
              setField(
                field.key,
                e.target.value.split("\n").map((l) => l.trim()).filter(Boolean)
              )
            }
          />
        );
      case "bool":
        return (
          <div className="flex items-center gap-3 pt-1">
            <Switch checked={!!value} onCheckedChange={(v) => setField(field.key, v)} />
            <span className="text-sm text-muted-foreground">{value ? "Yes" : "No"}</span>
          </div>
        );
      case "number":
        return (
          <Input
            type="number"
            value={(value as number) ?? 0}
            onChange={(e) => setField(field.key, Number(e.target.value))}
          />
        );
      case "image":
        return (
          <ImageUploader
            label=""
            value={(value as string) ?? null}
            onChange={(url) => setField(field.key, url)}
          />
        );
      case "items": {
        const items: { name: string; type: string; url?: string }[] = Array.isArray(value) ? value : [];
        const update = (i: number, patch: Record<string, string>) => {
          const next = items.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
          setField(field.key, next);
        };
        return (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-[1fr_140px_1fr_auto] items-center">
                <Input
                  placeholder="Name"
                  value={item.name ?? ""}
                  onChange={(e) => update(i, { name: e.target.value })}
                />
                <Input
                  placeholder="Badge"
                  value={item.type ?? ""}
                  onChange={(e) => update(i, { type: e.target.value })}
                />
                <Input
                  placeholder="Link (optional)"
                  value={item.url ?? ""}
                  onChange={(e) => update(i, { url: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Remove item"
                  onClick={() => setField(field.key, items.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setField(field.key, [...items, { name: "", type: "" }])}
            >
              <Plus className="w-4 h-4" /> Add item
            </Button>
          </div>
        );
      }
      default:
        return (
          <Input
            value={(value as string) ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => setField(field.key, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {rows?.length ?? 0} {singular.toLowerCase()}
          {(rows?.length ?? 0) === 1 ? "" : "s"}
        </p>
        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={() =>
            setEditing({ ...defaults, sort_order: (rows?.length ?? 0) + 1, is_published: true })
          }
        >
          <Plus className="w-4 h-4" /> Add {singular.toLowerCase()}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="space-y-3">
          {(rows ?? []).map((row) => (
            <div
              key={row.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border border-border bg-card"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-card-foreground break-words">{row[titleKey]}</h4>
                  {!row.is_published && (
                    <Badge variant="secondary" className="text-xs">
                      Hidden
                    </Badge>
                  )}
                </div>
                {subtitleKey && row[subtitleKey] && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{row[subtitleKey]}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={row.is_published ? "Hide" : "Show"}
                  onClick={() => togglePublish.mutate(row)}
                >
                  {row.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" aria-label="Edit" onClick={() => setEditing(row)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Delete"
                  onClick={() => setDeleteId(row.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editing?.id ? `Edit ${singular.toLowerCase()}` : `New ${singular.toLowerCase()}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{field.label}</label>
                {renderField(field)}
                {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
              </div>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Display order</label>
                <Input
                  type="number"
                  value={editing?.sort_order ?? 0}
                  onChange={(e) => setField("sort_order", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Visible on website</label>
                <div className="flex items-center gap-3 pt-1">
                  <Switch
                    checked={editing?.is_published ?? true}
                    onCheckedChange={(v) => setField("is_published", v)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {editing?.is_published ?? true ? "Published" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={() => editing && save.mutate(editing)} disabled={save.isPending}>
              {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this {singular.toLowerCase()}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from the website immediately. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && remove.mutate(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CollectionEditor;
