import { BookOpen, Video, FileText, Download, Wrench, ExternalLink, GraduationCap, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";

interface Resource {
  name: string;
  type: string;
  url?: string;
}

interface ResourceCategory {
  icon: typeof BookOpen;
  title: string;
  description: string;
  resources: Resource[];
}

const resourceCategories: ResourceCategory[] = [
  {
    icon: GraduationCap,
    title: "Free Learning Materials",
    description: "Curated guides, eBooks, and cheat sheets to kickstart your digital skills journey.",
    resources: [
      { name: "Beginner's Guide to Freelancing", type: "PDF Guide" },
      { name: "Digital Skills Roadmap 2026", type: "eBook" },
      { name: "Social Media Management Checklist", type: "Checklist" },
    ],
  },
  {
    icon: Video,
    title: "Webinar Recordings",
    description: "Watch replays of our past webinars and masterclasses with industry experts.",
    resources: [
      { name: "Will AI Replace You? — March 2026", type: "Recording", url: "https://drive.google.com/file/d/1YPcCm55gQCaCPnsVfrw3be5ltTg-ln8S/view?usp=drive_link" },
    ],
  },
  {
    icon: Wrench,
    title: "Recommended Tools",
    description: "Our top picks for tools and platforms every digital professional should know.",
    resources: [
      { name: "Design Tools for Beginners", type: "Tool List" },
      { name: "Content Writing & SEO Tools", type: "Tool List" },
      { name: "Video Editing Software Guide", type: "Comparison" },
    ],
  },
  {
    icon: FileText,
    title: "Templates & Frameworks",
    description: "Ready-to-use templates for portfolios, proposals, CVs, and client outreach.",
    resources: [
      { name: "Freelancer Proposal Template", type: "Template" },
      { name: "Portfolio Website Framework", type: "Template" },
      { name: "Client Onboarding Checklist", type: "Checklist" },
    ],
  },
  {
    icon: Lightbulb,
    title: "Career & Strategy Guides",
    description: "In-depth articles and guides on positioning yourself in the digital economy.",
    resources: [
      { name: "How to Land Your First Remote Job", type: "Guide" },
      { name: "Pricing Your Services Right", type: "Article" },
      { name: "Building a Personal Brand Online", type: "Guide" },
    ],
  },
  {
    icon: BookOpen,
    title: "Blog & Articles",
    description: "Stay informed with our latest insights on digital skills, AI, and the future of work.",
    resources: [
      { name: "From Prompt to Profit: AI Video Marketing", type: "Blog Post", url: "https://digitaldynastyinstitute.blogspot.com/2026/03/from-prompt-to-profit-ai-video-marketing.html" },
      { name: "Beyond the Degree: Digital High-Income Skills", type: "Blog Post", url: "https://digitaldynastyinstitute.blogspot.com/2026/03/beyond-the-degree-digital-high-income-skills-2026.html" },
    ],
  },
];

const Resources = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Learn & Grow</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Free{" "}
              <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Access our curated library of guides, templates, tools, and recordings to support your digital skills journey — all completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {resourceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{category.description}</p>
                  <ul className="space-y-3 mb-6">
                    {category.resources.map((resource) => (
                      <li key={resource.name} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-foreground truncate">{resource.name}</span>
                        <Badge variant="secondary" className="text-xs shrink-0">{resource.type}</Badge>
                      </li>
                    ))}
                  </ul>
                  {category.resources.some((r) => r.url) ? (
                    <div className="space-y-2">
                      {category.resources
                        .filter((r) => r.url)
                        .map((r) => (
                          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="w-full justify-between">
                              {r.type === "Recording" ? "Watch Recording" : "Read Article"}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          </a>
                        ))}
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Download className="w-4 h-4" />
                      Coming Soon
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
