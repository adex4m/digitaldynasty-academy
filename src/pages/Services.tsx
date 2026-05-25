import Layout from "@/components/layout/Layout";
import PageHero from "@/components/layout/PageHero";
import SEO from "@/components/SEO";
import CourseCard from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";

const Services = () => {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DigitalDynasty Imperium Courses",
    itemListElement: courses.slice(0, 12).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.description,
        provider: {
          "@type": "Organization",
          name: "DigitalDynasty Imperium",
          sameAs: "https://digitaldynastyacademy.lovable.app",
        },
      },
    })),
  };

  return (
    <Layout>
      <SEO
        title="Courses | DigitalDynasty Imperium"
        description="Explore our full catalog of digital skills courses: social media, copywriting, design, video editing, vibe-coding and more."
        path="/services"
        jsonLd={itemListJsonLd}
      />
      {/* Hero */}
      <section className="py-20 gradient-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Courses</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Master In-Demand{" "}
              <span className="gradient-text">Digital Skills</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From social media management to video editing, our comprehensive courses are designed by industry experts to help you succeed in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20" aria-labelledby="course-catalog-heading">
        <div className="container mx-auto px-4">
          <h2 id="course-catalog-heading" className="sr-only">Course Catalog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Course Levels Info */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Course Structure</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Flexible Learning Paths
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-xl shadow-card">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6">
                  <span className="text-primary-foreground font-display font-bold text-xl">1</span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4">Beginner Level</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for those new to digital skills. Our 6-week comprehensive program covers all the fundamentals you need to get started.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>Duration:</span>
                  <span>6 Weeks</span>
                </div>
              </div>

              <div className="bg-card p-8 rounded-xl shadow-card">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6">
                  <span className="text-primary-foreground font-display font-bold text-xl">2</span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4">Intermediate Level</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to level up? Our intermediate courses are customized based on your goals, helping you master advanced techniques.
                </p>
                <div className="flex items-center gap-2 text-accent font-semibold">
                  <span>Duration:</span>
                  <span>Custom (Based on your goals)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
