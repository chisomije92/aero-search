import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { fadeIn } from "@/src/lib/animations";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    id: "price",
    icon: <TrendingDownIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
    title: "Best Price Guarantee",
    description:
      "Find the lowest fares across all airlines with our advanced comparison engine. We match any lower price found elsewhere.",
  },
  {
    id: "security",
    icon: <SecurityIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
    title: "Secure Booking",
    description:
      "Your data is protected with industry-leading encryption and security protocols. PCI-DSS compliant payments.",
  },
  {
    id: "support",
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
    title: "24/7 Support",
    description:
      "Our dedicated team is always ready to help with any questions or concerns. Available via chat, email, and phone.",
  },
];

const ChooseAero = () => {
  return (
    <AnimatedSection variants={fadeIn}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Aero Search?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the future of flight booking with cutting-edge technology
            and unmatched service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-2xl hover:border-indigo-600 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ChooseAero;
