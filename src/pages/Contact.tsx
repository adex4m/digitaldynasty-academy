import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "digitaldynastyinstitute@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+234 912 254 7613, +234 907 425 2461",
      description: "Mon-Fri, 9am-5pm WAT"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Nigeria, West Africa",
      description: "Online classes available worldwide"
    },
    {
      icon: Clock,
      title: "Follow Us",
      details: "Social Media",
      description: "Connect with us on our social platforms"
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Let's Start Your{" "}
              <span className="gradient-text">Digital Journey</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have questions about our courses or want to enroll? We're here to help you take the first step toward your digital career.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-primary font-semibold mb-1">{item.details}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Leave a Message CTA */}
          <div className="max-w-2xl mx-auto text-center bg-secondary p-12 rounded-2xl">
            <MessageSquare className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Want to Leave Us a Message?
            </h2>
            <p className="text-muted-foreground mb-8">
              Have a specific question or inquiry? Fill out our message form and we'll get back to you as soon as possible.
            </p>
            <Link to="/message">
              <Button variant="hero" size="xl">
                Leave a Message
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How do I enroll in a course?",
                  answer: "Click on the \"Enroll\" button on your preferred course. You will be redirected to an external page to complete your purchase."
                },
                {
                  question: "Are the courses online or in-person?",
                  answer: "Our courses are delivered online, making them accessible to learners worldwide. In-person sessions are available exclusively for premium and custom course packages."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept various payment methods including bank transfers and mobile payments. Contact us for specific payment options."
                },
                {
                  question: "Do I get a certificate after completing a course?",
                  answer: "Yes! All students who successfully complete their course receive a certificate from DigitalDynasty Institute."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-card">
                  <h3 className="font-display font-bold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
