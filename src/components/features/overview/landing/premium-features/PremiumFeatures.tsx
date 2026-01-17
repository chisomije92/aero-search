import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { fadeIn } from "@/src/lib/animations";

const premiumFeatures = [
  {
    id: "alerts",
    icon: <NotificationsActiveIcon sx={{ fontSize: 32, color: "#ec4899" }} />,
    title: "Smart Price Alerts",
    description:
      "Get notified instantly when prices drop for your favorite routes",
  },
  {
    id: "flexible",
    icon: <AccessTimeIcon sx={{ fontSize: 32, color: "#f59e0b" }} />,
    title: "Flexible Booking",
    description: "Change or cancel your flights with zero penalties",
  },
  {
    id: "rewards",
    icon: <GroupIcon sx={{ fontSize: 32, color: "#10b981" }} />,
    title: "Loyalty Rewards",
    description: "Earn points on every booking and redeem for discounts",
  },
  {
    id: "insurance",
    icon: <VerifiedUserIcon sx={{ fontSize: 32, color: "#3b82f6" }} />,
    title: "Travel Insurance",
    description: "Comprehensive coverage for peace of mind on every trip",
  },
];

const PremiumFeatures = () => {
  return (
    <AnimatedSection variants={fadeIn}>
      <div className="bg-linear-to-r from-slate-900 to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Premium Features
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Unlock exclusive benefits with our premium membership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-slate-700 bg-opacity-50 border border-slate-600 rounded-xl p-6 hover:bg-opacity-70 transition-all duration-300 hover:border-indigo-400"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PremiumFeatures;
