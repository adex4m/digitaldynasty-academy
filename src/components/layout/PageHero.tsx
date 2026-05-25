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
 * Unified About-style hero used across all pages.
 * Always dark (#0D0A1A) with radial purple glow, regardless of theme.
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
      className={`relative overflow-hidden ${
        size === "compact"
          ? "pt-28 pb-16 sm:pt-32 sm:pb-20"
          : "pt-32 pb-24 sm:pt-40 sm:pb-32"
      }`}
      style={{ backgroundColor: "#0D0A1A" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(73,34,140,0.45) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(123,79,191,0.2) 0%, transparent 60%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""} space-y-6`}>
          {eyebrow && (
            <p
              className="font-sans"
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7B4FBF",
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="font-display tracking-tight"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#FFFFFF",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="max-w-2xl"
              style={{
                fontSize: "clamp(15px, 1.8vw, 19px)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                marginLeft: isCenter ? "auto" : undefined,
                marginRight: isCenter ? "auto" : undefined,
              }}
            >
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
