import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BootcampCardProps {
  title: string;
  description: string;
  image: string;
  status: "upcoming" | "contact";
  highlights: string[];
}

const BootcampCard = ({ title, description, image, status, highlights }: BootcampCardProps) => {
  const mailtoUrl = `mailto:support@digitaldynasty.academy?subject=${encodeURIComponent(`Inquiry into ${title}`)}`;

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={1024}
          height={576}
          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
            {status === "upcoming" ? "Coming Soon" : "Enquire Now"}
          </Badge>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground mb-5 leading-relaxed text-sm md:text-base">
          {description}
        </p>
        {highlights.length > 0 && (
          <ul className="space-y-2 mb-6">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}
        <a href={mailtoUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="hero" className="w-full">
            <Mail className="w-4 h-4" />
            Contact Us for Details
          </Button>
        </a>
      </div>
    </div>
  );
};

export default BootcampCard;
