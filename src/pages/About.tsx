import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, Lightbulb, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const About = () => {
  const coreValues = [
    { icon: Heart, title: "Accessibility", description: "Education for all, regardless of background." },
    { icon: Target, title: "Excellence", description: "Delivering top-tier training from industry experts." },
    { icon: Users, title: "Community", description: "Fostering a supportive and collaborative environment." },
    { icon: Lightbulb, title: "Innovation", description: "Constantly evolving to meet industry demands." },
    { icon: Shield, title: "Integrity", description: "Operating with honesty and transparency." },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Building the Future of{" "}
              <span className="gradient-text">Digital Education</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded on March 10, 2025, DigitalDynasty Institute began with seven founding members offering diverse digital skills training. Our mission is to become the leading digital academy in West Africa within five years.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                From Vision to Reality
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Under the leadership of Eniola A Hassan, DigitalDynasty Institute was founded with a simple but powerful vision: to democratize digital education across West Africa.
                </p>
                <p>
                  We believe that everyone deserves access to high-quality digital education, regardless of their background or financial situation. Through strategic partnerships and a commitment to accessible, high-quality education, we're turning that vision into reality.
                </p>
                <p>
                  Our institute maintains a culture that blends corporate professionalism (40%) with a youthful, community-driven spirit (60%), creating an environment where learners thrive.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-secondary rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <Eye className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">Our Vision</h3>
                    <p className="text-muted-foreground text-sm">
                      To be the best digital academy from West Africa, with industry experts giving value to thousands of students digitally.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Target className="w-10 h-10 text-accent" />
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">Our Mission</h3>
                    <p className="text-muted-foreground text-sm">
                      To impact lives by giving everyone equally affordable access to digital education from industry experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Core Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground">
              These principles guide everything we do at DigitalDynasty Institute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Join the DigitalDynasty Family
          </h2>
          <p className="text-primary-foreground/85 max-w-2xl mx-auto mb-8 text-lg">
            Be part of our journey to transform digital education in West Africa.
          </p>
          <Link to="/contact">
            <Button variant="hero-outline" size="xl">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
