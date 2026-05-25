import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode; // wrap accented words with <em> for serif italic
  subtitle?: ReactNode;
  children?: ReactNode; // CTAs
  align?: "left" | "center";
  size?: "default" | "compact";
}

/**
 * Unified hero used across all pages.
 * Editorial dark/cream surface with radial purple glow,
 * uppercase eyebrow, large Syne display headline with
 * optional Instrument Serif italic accent, sub copy, CTA slot.
 */
const PageHero = ({
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
  size = "default",
}: PageHeroProps) => {
  const isCenter = align === "center";
  return (
    <section
      className={`relative overflow-hidden bg-background ${
        size === "compact"
          ? "pt-24 pb-16 sm:pt-28 sm:pb-20"
          : "pt-28 pb-20 sm:pt-32 sm:pb-28"
      }`}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, hsl(var(--primary) / 0.35) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 10% 80%, hsl(var(--accent) / 0.2) 0%, transparent 60%)",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""} space-y-6`}
        >
          {eyebrow && (
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-accent">
              {eyebrow}
            </p>
          )}
          <h1
            className="font-display font-extrabold text-foreground leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(36px, 6vw, 76px)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light max-w-2xl"
               style={isCenter ? { marginLeft: "auto", marginRight: "auto" } : undefined}>
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`flex flex-col sm:flex-row gap-4 pt-2 ${isCenter ? "justify-center" : ""}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
