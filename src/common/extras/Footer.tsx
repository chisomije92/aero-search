import Plane from "@/src/components/ui/icons/Plane";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("bg-gray-900 text-white py-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex gap-2 items-end mb-2">
              <div className="p-2 bg-[#4f46e5] rounded-lg text-white">
                <Plane />
              </div>
              <span className="font-serif text-xl font-bold tracking-wide">
                Aero Search
              </span>
            </div>

            <p className="text-gray-400">
              Your trusted partner for finding the best flight deals worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Press"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Contact Us", "FAQ", "Status"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Cookies", "License"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Aero Search. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
