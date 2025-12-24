import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="Digital Dynasty students learning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-accent/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Build Your Digital Empire with{" "}
              <span className="text-background">Industry Experts</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed max-w-2xl">
              West Africa's premier digital academy offering affordable, high-quality training in social media, design, writing, and more. Transform your skills. Transform your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button variant="hero-outline" size="xl" className="group">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="hero-outline" size="xl">
                  Learn About Us
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-background/20">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary-foreground">9+</div>
                <div className="text-primary-foreground/70 text-sm">Courses</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary-foreground">1000+</div>
                <div className="text-primary-foreground/70 text-sm">Students</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary-foreground">7+</div>
                <div className="text-primary-foreground/70 text-sm">Expert Instructors</div>
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
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="hero" size="lg">
                Explore All 9 Courses
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
            Join thousands of learners who are transforming their careers with DigitalDynasty Institute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero-outline" size="xl">
                Contact Us Today
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="hero-outline" size="xl">
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
