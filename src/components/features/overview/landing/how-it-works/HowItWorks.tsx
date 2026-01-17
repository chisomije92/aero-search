import { AnimatedSection } from "@/src/components/ui/AnimationSection";

const HowItWorks = () => {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Search",
              description:
                "Enter your travel dates and destinations to find available flights",
            },
            {
              step: "2",
              title: "Compare",
              description:
                "Browse through hundreds of options and compare prices instantly",
            },
            {
              step: "3",
              title: "Book",
              description:
                "Secure your booking with our safe and encrypted payment system",
            },
            {
              step: "4",
              title: "Travel",
              description: "Enjoy your trip and create unforgettable memories",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HowItWorks;
