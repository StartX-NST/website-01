import { Link } from "react-router-dom";
import { Mail, MapPin, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  className?: string;
  hideWrapperStyle?: boolean;
}

export function Footer({
  className = "",
  hideWrapperStyle = false,
}: FooterProps) {
  const cardContent = (
    <div
      className={`relative z-10 max-w-7xl mx-auto w-full bg-white text-black p-6 sm:p-8 md:p-12 lg:p-16 rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3.5rem] rounded-b-none border-t border-x border-neutral-200/50 shadow-[0_-12px_40px_rgba(0,0,0,0.05)] ${hideWrapperStyle ? "mt-12 sm:mt-16" : ""} pb-6 sm:pb-8`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-8 lg:gap-16 pb-8 md:pb-12">
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/image.png"
              alt="StartX Logo"
              className="h-7 sm:h-8 w-auto brightness-0"
            />
          </Link>
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 font-medium">
            A student-founder ecosystem for learning, building, and shipping.
            Join 1000+ builders creating the future.
          </p>
        </div>

        {[
          {
            title: "About Us",
            links: [
              { label: "Our Mission", href: "#about" },
              { label: "Success Stories", href: "/showcase" },
              { label: "Partner With Us", href: "#partner" },
              { label: "Careers", href: "#careers" },
            ],
          },
          {
            title: "Platform",
            links: [
              { label: "Events", href: "/events" },
              { label: "Learn", href: "/learn" },
              { label: "Showcase", href: "/showcase" },
              { label: "Opportunities", href: "/opportunities" },
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="text-black text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">
              {section.title}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-neutral-500 hover:text-black font-medium text-xs sm:text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-black text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">
            Contact Us
          </h4>
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-center space-x-3 text-neutral-500 font-medium text-xs sm:text-sm">
              <Mail size={16} className="text-neutral-400 shrink-0" />
              <a
                href="mailto:startx.ru@newtonschool.co"
                className="hover:text-black transition-colors break-all sm:break-normal"
              >
                startx.ru@newtonschool.co
              </a>
            </li>
            <li className="flex items-center space-x-3 text-neutral-500 font-medium text-xs sm:text-sm">
              <MapPin size={16} className="text-neutral-400 shrink-0" />
              <span>NST, Rishihood University</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-t border-neutral-200 my-6 sm:my-8" />

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
        <p className="text-neutral-500 font-medium text-center sm:text-left">
          &copy; {new Date().getFullYear()} StartX. All rights reserved.
        </p>

        <div className="flex space-x-6 text-neutral-400">
          <a
            href="https://www.instagram.com/startx.nst?igsh=MWlxNWZieHQ1d3ltcg=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-black transition-colors p-1"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/startx-nst/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-black transition-colors p-1"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </div>
  );

  if (hideWrapperStyle) {
    return cardContent;
  }

  return (
    <footer
      className={`w-full bg-black px-3 sm:px-6 md:px-12 pt-10 sm:pt-16 z-20 relative ${className}`}
    >
      {cardContent}
    </footer>
  );
}
