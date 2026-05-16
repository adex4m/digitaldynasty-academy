import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">D</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-foreground">Digital</span>
                <span className="font-display font-bold text-lg text-primary">Dynasty</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering the next generation of digital professionals across West Africa with accessible, high-quality education.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1Aq8nuVBn8/" target="_blank" rel="noopener noreferrer" aria-label="Follow DigitalDynasty Imperium on Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/digitaldynasty_institute/" target="_blank" rel="noopener noreferrer" aria-label="Follow DigitalDynasty Imperium on Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/digitaldynastyinstitute/" target="_blank" rel="noopener noreferrer" aria-label="Follow DigitalDynasty Imperium on LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Courses</Link>
              <Link to="/bootcamp" className="text-muted-foreground hover:text-primary transition-colors">Bootcamp & Events</Link>
              <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">Our Courses</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Social Media Management</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Content Writing</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Graphic Design</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Video Editing</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:digitaldynastyinstitute@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail size={18} />
                <span className="text-sm">digitaldynastyinstitute@gmail.com</span>
              </a>
              <a href="tel:+2349122547613" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone size={18} />
                <span className="text-sm">+234 912 254 7613, +234 907 425 2461</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="mt-0.5" />
                <span className="text-sm">Nigeria, West Africa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} DigitalDynasty Imperium. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
