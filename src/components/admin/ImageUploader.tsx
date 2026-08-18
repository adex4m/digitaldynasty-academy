import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TEN_YEARS_SECONDS = 60 * 60 * 24 * 365 * 10;

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}

const ImageUploader = ({ value, onChange, label = "Image" }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("site-media")
        .upload(path, file, { cacheControl: "31536000", upsert: false });
      if (uploadError) throw uploadError;

      const { data, error: signError } = await supabase.storage
        .from("site-media")
        .createSignedUrl(path, TEN_YEARS_SECONDS);
      if (signError || !data?.signedUrl) throw signError ?? new Error("Could not create image URL");

      onChange(data.signedUrl);
      toast.success("Image uploaded");
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {value ? (
        <div className="relative w-full max-w-xs">
          <img src={value} alt="Selected" className="w-full h-32 object-cover rounded-lg border border-border" />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove image"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 border border-border flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          No image uploaded — the built-in artwork for this item is used.
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="w-full sm:w-auto"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading…" : "Upload image"}
        </Button>
        <Input
          placeholder="…or paste an image URL"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageUploader;
