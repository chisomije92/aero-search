import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { fadeUp } from "@/src/lib/animations";

const PopularDestinations = () => {
  const destinations = [
    { city: "Paris", country: "France", flights: "2,450+", image: "🗼" },
    { city: "Tokyo", country: "Japan", flights: "1,890+", image: "🗾" },
    { city: "New York", country: "USA", flights: "3,120+", image: "🗽" },
    { city: "Dubai", country: "UAE", flights: "2,680+", image: "🏙️" },
    { city: "Sydney", country: "Australia", flights: "1,540+", image: "🦘" },
    { city: "Barcelona", country: "Spain", flights: "2,210+", image: "🏖️" },
  ];
  return (
    <AnimatedSection variants={fadeUp}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore flights to the world&apos;s most sought-after destinations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.city}
              className="group relative overflow-hidden rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 text-5xl opacity-20 group-hover:opacity-30 transition-opacity">
                {destination.image}
              </div>
              <div className="relative z-10">
                <p className="text-5xl mb-2">{destination.image}</p>
                <h3 className="text-2xl font-bold mb-1">{destination.city}</h3>
                <p className="text-indigo-100 mb-4">{destination.country}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {destination.flights} flights
                  </span>
                  <span className="text-indigo-200 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PopularDestinations;
