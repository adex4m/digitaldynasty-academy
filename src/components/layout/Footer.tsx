import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">D</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-background">Digital</span>
                <span className="font-display font-bold text-lg text-primary-light">Dynasty</span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Empowering the next generation of digital professionals across West Africa with accessible, high-quality education.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-primary-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-background/60 hover:text-primary-light transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-background/70 hover:text-primary-light transition-colors">Home</Link>
              <Link to="/about" className="text-background/70 hover:text-primary-light transition-colors">About Us</Link>
              <Link to="/services" className="text-background/70 hover:text-primary-light transition-colors">Our Courses</Link>
              <Link to="/contact" className="text-background/70 hover:text-primary-light transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Our Courses</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/services" className="text-background/70 hover:text-primary-light transition-colors">Social Media Management</Link>
              <Link to="/services" className="text-background/70 hover:text-primary-light transition-colors">Content Writing</Link>
              <Link to="/services" className="text-background/70 hover:text-primary-light transition-colors">Graphic Design</Link>
              <Link to="/services" className="text-background/70 hover:text-primary-light transition-colors">Video Editing</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:info@digitaldynasty.institute" className="flex items-center gap-3 text-background/70 hover:text-primary-light transition-colors">
                <Mail size={18} />
                <span className="text-sm">info@digitaldynasty.institute</span>
              </a>
              <a href="tel:+2341234567890" className="flex items-center gap-3 text-background/70 hover:text-primary-light transition-colors">
                <Phone size={18} />
                <span className="text-sm">+234 123 456 7890</span>
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin size={18} className="mt-0.5" />
                <span className="text-sm">Nigeria, West Africa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} DigitalDynasty Institute. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-background/50 hover:text-primary-light transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-background/50 hover:text-primary-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
