import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const headingStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#FFFFFF",
    marginBottom: "1.25rem",
  };
  const linkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "rgba(255,255,255,0.5)",
    transition: "color 0.2s",
  };

  return (
    <footer style={{ backgroundColor: "#1A1530" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#49228C" }}
              >
                <span className="font-display font-bold text-lg" style={{ color: "#FFFFFF" }}>D</span>
              </div>
              <div className="font-display font-bold text-lg">
                <span style={{ color: "#FFFFFF" }}>Digital</span>
                <span style={{ color: "#7B4FBF" }}>Dynasty</span>
              </div>
            </div>
            <p style={{ ...linkStyle, lineHeight: 1.75 }}>
              Empowering the next generation of digital professionals across West Africa with accessible, high-quality education.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { href: "https://www.facebook.com/share/1Aq8nuVBn8/", Icon: Facebook, label: "Facebook" },
                { href: "https://www.instagram.com/digitaldynasty_institute/", Icon: Instagram, label: "Instagram" },
                { href: "https://www.linkedin.com/company/digitaldynastyinstitute/", Icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow DigitalDynasty Imperium on ${label}`}
                  style={{ color: "#FFFFFF", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#7B4FBF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={headingStyle}>Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Our Courses" },
                { to: "/bootcamp", label: "Bootcamp & Events" },
                { to: "/resources", label: "Resources" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <Link
                  key={l.to + l.label}
                  to={l.to}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 style={headingStyle}>Our Courses</h4>
            <nav className="flex flex-col gap-3">
              {["Social Media Management", "Content Writing", "Graphic Design", "Video Editing"].map((c) => (
                <Link
                  key={c}
                  to="/services"
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  {c}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 style={headingStyle}>Contact Us</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:support@digitaldynasty.academy"
                className="flex items-start gap-3 min-w-0"
                style={linkStyle}
              >
                <Mail size={18} className="shrink-0 mt-0.5" />
                <span className="break-all">support@digitaldynasty.academy</span>
              </a>
              <a
                href="tel:+2349122547613"
                className="flex items-start gap-3 min-w-0"
                style={linkStyle}
              >
                <Phone size={18} className="shrink-0 mt-0.5" />
                <span className="break-words">+234 912 254 7613, +234 907 425 2461</span>
              </a>
              <div className="flex items-start gap-3" style={linkStyle}>
                <MapPin size={18} className="mt-0.5" />
                <span>Nigeria, West Africa</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} DigitalDynasty Imperium. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" style={{ ...linkStyle, fontSize: "13px" }}>Privacy Policy</Link>
            <Link to="/terms" style={{ ...linkStyle, fontSize: "13px" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
