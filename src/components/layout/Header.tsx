import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ddiLogo from "@/assets/ddi-logo-mark.png";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks: { name: string; path: string; external?: boolean }[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/services" },
  { name: "Events", path: "/bootcamp" },
  { name: "Resources", path: "/resources" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "#0D0A1A", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center" aria-label="DigitalDynasty Imperium home">
              <span className="inline-flex items-center justify-center">
                <img src={ddiLogo} alt="DigitalDynasty Imperium" className="h-8 lg:h-10 w-auto" />
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                const baseStyle = {
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: active ? "#7B4FBF" : "#FFFFFF",
                  transition: "color 0.2s",
                };
                return link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:!text-[#7B4FBF]"
                    style={baseStyle}
                  >
                    {link.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="hover:!text-[#7B4FBF]"
                    style={baseStyle}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/services">
              <Button variant="hero">Start Learning</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              style={{ color: "#FFFFFF" }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                const linkStyle = {
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  color: active ? "#7B4FBF" : "#FFFFFF",
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                };
                return link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1"
                    style={linkStyle}
                  >
                    {link.name}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    style={linkStyle}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link to="/services" onClick={() => setIsOpen(false)} className="mt-3">
                <Button variant="hero" className="w-full">
                  Start Learning
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
