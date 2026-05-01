import { Link } from "react-router-dom";
import { Target, Eye, Heart, Users, Lightbulb, Shield, ArrowRight, Trophy, Rocket, GraduationCap } from "lucide-react";
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
              About{" "}
              <span className="gradient-text">DigitalDynasty Imperium (DDI)</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Building Legacies from the Ground Up
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Building Legacies from the Ground Up
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded on March 10, 2025, under the leadership of Eniola A. Hassan, DigitalDynasty Imperium (DDI) began with a clear purpose: to bridge the gap between ambition and high-level digital expertise. What started with seven founding members offering diverse digital skills training has rapidly evolved into a movement for accessible education.
                </p>
                <p>
                  We didn't just want to create another training center; we set out to build a Dynasty—a place where the next generation of digital leaders (our Dynasts) could find their footing and thrive in the modern economy.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-secondary rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">Where We Are Today</h3>
                    <p className="text-muted-foreground text-sm">
                      DDI is recognized for its unique culture—a blend of 40% corporate professionalism and 60% youthful, community-driven spirit. We pride ourselves on being a high-quality, accessible gateway to the tech world.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-10 h-10 text-accent" />
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">10+ Industry-Expert Coaches</h3>
                    <p className="text-muted-foreground text-sm">
                      We provide hands-on mentorship in fields like AI Video Creation, Social Media Management, and Content Writing, ensuring our curriculum stays updated and impactful across generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Foundation</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Vision & Mission
            </h2>
            <p className="text-muted-foreground">
              At the heart of everything we do are the pillars of Accessibility, Excellence, Community, Innovation, and Integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-lg gradient-bg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the best digital academy from West Africa, with industry experts giving value to thousands of students digitally.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-lg gradient-bg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To impact lives by giving everyone equally affordable access to digital education from industry experts. We don't just teach; we help you identify your strength and maximize it, ensuring you aren't just moving with speed, but moving in the right direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Dynast Experience */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-secondary rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">The Dynasty Circle</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      When you join DDI, you enter the Dynasty Circle—a vibrant, supportive ecosystem where students collaborate, share resources, and grow together. Our community groups are designed to provide the peer support and networking needed to transition successfully into the digital world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">The Dynast Experience</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                More Than Just Learning
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Because our culture is 60% community-driven, being a Dynast is about more than just watching videos or attending classes. It's about becoming part of a movement, connecting with like-minded individuals, and building lasting professional relationships.
              </p>
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
              These principles guide everything we do at DigitalDynasty Imperium.
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

      {/* Our Ambition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Ambition</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              The Roadmap to #1
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We are on a relentless pursuit of excellence with clear milestones in sight.
            </p>
            <div className="bg-secondary rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">The Long-Term Goal</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    To be recognized as the leading digital academy in West Africa, integrating advanced Learning Management Systems (LMS) and forming strategic partnerships with top global organizations to provide our Dynasts with internships and job placements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Join the Dynasty
          </h2>
          <p className="text-primary-foreground/85 max-w-2xl mx-auto mb-8 text-lg">
            Start your transition today. Be part of our journey to transform digital education in West Africa.
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
