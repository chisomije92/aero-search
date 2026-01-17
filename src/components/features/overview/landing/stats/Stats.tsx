import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { fadeUp } from "@/src/lib/animations";

const stats = [
  { number: "2M+", label: "Happy Travelers", icon: "✈️" },
  { number: "500K+", label: "Flights Daily", icon: "🛫" },
  { number: "180+", label: "Countries", icon: "🌍" },
  { number: "99.9%", label: "Uptime", icon: "⚡" },
];

const Stats = () => {
  return (
    <AnimatedSection variants={fadeUp}>
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl mb-3">{stat.icon}</p>
                <p className="text-4xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Stats;
