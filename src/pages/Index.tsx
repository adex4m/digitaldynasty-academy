import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Award, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";
import heroBanner from "@/assets/hero-banner.jpg";
import blogAiVideo from "@/assets/blog-ai-video.jpg";
import blogDigitalSkills from "@/assets/blog-digital-skills.jpg";

const BLOG_URL = "https://digitaldynastyinstitute.blogspot.com";

const blogPosts = [
  {
    title: "From Prompt to Profit: How AI Video Creation is Revolutionizing Modern Content Marketing",
    date: "March 30, 2026",
    description: "Stop spending weeks on video production. Discover how to leverage AI tools to create high-converting content at scale and turn simple prompts into high-ticket marketing assets.",
    url: "https://digitaldynastyinstitute.blogspot.com/2026/03/from-prompt-to-profit-ai-video-marketing.html",
    image: blogAiVideo,
    imageAlt: "Person using AI to generate professional marketing video - DigitalDynasty Imperium.",
    cta: "Read More",
  },
  {
    title: "Why Digital High-Income Skills Are the New Global Currency",
    date: "March 30, 2026",
    description: "Traditional education is changing. Read our deep dive into why high-income digital skills are now the global standard for professional freedom and how you can adapt.",
    url: "https://digitaldynastyinstitute.blogspot.com/2026/03/beyond-the-degree-digital-high-income-skills-2026.html",
    image: blogDigitalSkills,
    imageAlt: "Professional developing high-income digital skills at modern workstation - DigitalDynasty Imperium.",
    cta: "Read the Full Report",
  },
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="DigitalDynasty Imperium | Digital Skills Academy"
        description="Learn social media, copywriting, design, video editing and more with West Africa's premier digital academy. Build your digital empire today."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-[hsl(var(--background))]">
          <img 
            src={heroBanner} 
            alt="Digital Dynasty students learning" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 80% 20%, hsl(var(--primary) / 0.55) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 10% 80%, hsl(var(--accent) / 0.35) 0%, transparent 60%), linear-gradient(180deg, hsl(var(--background) / 0.85), hsl(var(--background) / 0.95))",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">

            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-accent">
              Digital Dynasty Imperium · Lagos, Nigeria
            </p>
            <h1 className="font-display font-extrabold text-foreground leading-[1.05] tracking-tight" style={{ fontSize: "clamp(40px, 7vw, 88px)" }}>
              Build your digital empire with{" "}
              <em className="font-editorial">industry experts.</em>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              West Africa's premier digital academy offering affordable, high-quality training in social media, design, writing, and more. Transform your skills. Transform your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Learn About Us
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground">10+</div>
                <div className="text-muted-foreground text-sm">Courses</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground">100+</div>
                <div className="text-muted-foreground text-sm">Students</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground">7+</div>
                <div className="text-muted-foreground text-sm">Expert Instructors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose DDI</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Your Path to Digital Excellence
            </h2>
            <p className="text-muted-foreground">
              We're committed to making digital education accessible, affordable, and impactful for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Expert Instructors",
                description: "Learn from industry professionals with real-world experience."
              },
              {
                icon: Users,
                title: "Community-Driven",
                description: "Join a supportive network of learners and mentors."
              },
              {
                icon: Award,
                title: "Practical Skills",
                description: "Gain hands-on experience with real projects and portfolios."
              },
              {
                icon: Globe,
                title: "Accessible Education",
                description: "Affordable courses designed for learners of all backgrounds."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg text-card-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates / Blog */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
                From Our Blog
              </h2>
            </div>
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="group">
                View All Posts
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={512}
                  />
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-muted-foreground text-xs">{post.date}</span>
                  <h3 className="font-display font-bold text-lg text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                    {post.cta} <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Courses</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
                Master In-Demand Skills
              </h2>
            </div>
            <Link to="/services">
              <Button variant="outline" className="group">
                View All Courses
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              const filtered = courses.filter(c => !c.isCustomRequest);
              const vibeCoding = filtered.find(c => c.id === "vibe-coding");
              const others = filtered.filter(c => c.id !== "vibe-coding").slice(0, 5);
              const displayed = vibeCoding ? [vibeCoding, ...others] : filtered.slice(0, 6);
              return displayed.map((course) => (
                <CourseCard key={course.id} course={course} />
              ));
            })()}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="hero" size="lg">
                Explore All Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Digital Journey?
          </h2>
          <p className="text-primary-foreground/85 max-w-2xl mx-auto mb-8 text-lg">
            Join hundreds of learners who are transforming their careers with DigitalDynasty Imperium.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Contact Us Today
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
