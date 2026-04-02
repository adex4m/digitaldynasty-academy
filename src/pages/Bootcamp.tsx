import { Link } from "react-router-dom";
import { Calendar, ExternalLink, CheckCircle, Play, Bell, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import BootcampCard from "@/components/bootcamp/BootcampCard";
import bootcampBanner from "@/assets/bootcamp-banner.jpg";
import webinarImage from "@/assets/webinar-ai-replace.png";
import socialMediaImg from "@/assets/bootcamp-social-media.jpg";
import freelanceImg from "@/assets/bootcamp-freelance.jpg";
import monetizationImg from "@/assets/bootcamp-monetization.jpg";

const tiers = [
  {
    name: "Tier 1",
    title: "Basic Access",
    price: "FREE",
    highlight: false,
    features: [
      "Opening webinar: From Learning to Earning",
      "Words from every DDI tutor",
      "Digital Skills Reality Check",
      "Beginner positioning strategy",
      "Freelancing vs Remote Jobs vs Employment session",
      "Bootcamp workbook/checklist",
      "Bootcamp participation certificate",
    ],
  },
  {
    name: "Tier 2",
    title: "Professional Package",
    price: "PAID",
    highlight: true,
    features: [
      "Includes Tier 1",
      "Social media optimization training",
      "CV optimization workshop",
      "Portfolio creation",
      "Market positioning training",
      "30-day accountability group",
    ],
  },
  {
    name: "Tier 3",
    title: "Elite Package",
    price: "PAID",
    highlight: false,
    features: [
      "Includes Tier 1 & Tier 2",
      "Live session with an Upwork expert",
      "Upwork profile setup & optimization",
      "Proposal writing training",
      "Upwork profile review",
      "Freelancing strategy session",
      "One-week mentoring",
    ],
  },
];

const upcomingBootcamps = [
  {
    title: "Social Media Optimization Bootcamp",
    description:
      "Master the art of building a powerful personal brand on social media. Learn content strategy, audience growth, engagement tactics, and how to turn your online presence into career opportunities.",
    image: socialMediaImg,
    status: "contact" as const,
    highlights: [
      "Content strategy & planning",
      "Platform-specific optimization",
      "Personal branding masterclass",
      "Engagement & growth hacking",
    ],
  },
  {
    title: "Start Your Freelance Journey Bootcamp",
    description:
      "Everything you need to launch a successful freelance career — from setting up your profiles to landing your first clients and building a sustainable income stream.",
    image: freelanceImg,
    status: "contact" as const,
    highlights: [
      "Freelance platform setup",
      "Proposal & pitch writing",
      "Client management essentials",
      "Pricing & negotiation tactics",
    ],
  },
  {
    title: "Skill Monetization Bootcamp",
    description:
      "Turn your digital skills into real income. Learn proven strategies for packaging, pricing, and selling your expertise through multiple revenue channels.",
    image: monetizationImg,
    status: "contact" as const,
    highlights: [
      "Identify monetizable skills",
      "Build digital products & services",
      "Multiple income stream strategies",
      "Sales funnel fundamentals",
    ],
  },
];

const Bootcamp = () => {
  const subscribeUrl =
    "/message?subject=" +
    encodeURIComponent("Future events subscription") +
    "&message=" +
    encodeURIComponent(
      "Hi DDI Team,\n\nI would like to subscribe to receive notifications about future bootcamps, webinars, and events from DigitalDynasty Institute.\n\nPlease add me to your events mailing list.\n\nThank you!"
    );

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              <Calendar className="w-3.5 h-3.5 mr-1" /> Upcoming & Past Events
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Bootcamps &{" "}
              <span className="gradient-text">Events</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Join our intensive bootcamps and exclusive webinars designed to accelerate your digital career. Learn from industry experts and connect with a community of ambitious learners.
            </p>
            <Link to={subscribeUrl}>
              <Button variant="hero" size="xl">
                <Bell className="w-5 h-5" />
                Subscribe to Future Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Bootcamp — Learn → Earn */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🔥 Currently Open for Registration
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Removing the L from Learn → <span className="gradient-text">Earn</span> Bootcamp
            </h2>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                19 April – 25 April 2026
              </span>
            </div>
          </div>

          {/* Banner */}
          <div className="max-w-3xl mx-auto mb-16">
            <img
              src={bootcampBanner}
              alt="Removing the L from Learn to Earn Bootcamp - DigitalDynasty Institute, April 19-25 2026"
              className="w-full rounded-2xl shadow-card"
            />
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-card rounded-2xl p-8 shadow-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  tier.highlight
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <div className="text-center mb-6">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">{tier.name}</span>
                  <h3 className="font-display text-xl font-bold text-foreground mt-2">{tier.title}</h3>
                  <p className="text-3xl font-bold text-foreground mt-3">{tier.price}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://selar.com/removing-the-l-from-learn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant={tier.highlight ? "hero" : "outline"} className="w-full">
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">More Bootcamps</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
              Explore Our Other <span className="gradient-text">Bootcamps</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Intensive, hands-on programs designed to take you from learning to earning. Contact us to learn more about upcoming cohorts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {upcomingBootcamps.map((bootcamp) => (
              <BootcampCard key={bootcamp.title} {...bootcamp} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Past Events</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
              Catch Up on What You Missed
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Missed a live session? Access recordings from our past webinars and events.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
              <div className="relative">
                <img
                  src={webinarImage}
                  alt="Will AI Replace You? Webinar by DigitalDynasty Institute - March 1, 2026"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <a
                    href="https://drive.google.com/file/d/1YPcCm55gQCaCPnsVfrw3be5ltTg-ln8S/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </a>
                </div>
              </div>
              <div className="p-8">
                <Badge variant="outline" className="mb-3 border-primary/30 text-primary">Webinar</Badge>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Will AI Replace You?
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  An exclusive webinar exploring what AI is, the threat it poses, and why alignment through digital skills — not resistance — is the only way forward. Hosted by Tolulope Adebisi (Co-Founder, DDI) with guest Samuel Akinyemi (Founder, Sannex Tech & Co-Founder, NivasityAI).
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    March 1, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    8 PM GMT
                  </span>
                </div>
                <a
                  href="https://drive.google.com/file/d/1YPcCm55gQCaCPnsVfrw3be5ltTg-ln8S/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero">
                    <Play className="w-4 h-4" />
                    Watch Recording
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-card rounded-2xl p-10 shadow-card border border-border">
            <Bell className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Don't Miss Our Next Event
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Subscribe to get notified about upcoming bootcamps, webinars, and exclusive learning opportunities from DigitalDynasty Institute.
            </p>
            <Link to={subscribeUrl}>
              <Button variant="hero" size="xl">
                <Bell className="w-5 h-5" />
                Subscribe to Future Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bootcamp;
