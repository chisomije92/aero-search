import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { fadeIn } from "@/src/lib/animations";
import StarIcon from "@mui/icons-material/Star";

const testimonials = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Frequent Traveler",
    location: "New York, USA",
    text: "Aero Search saved me hundreds on my last trip. The interface is intuitive and the prices are unbeatable!",
    rating: 5,
    trips: "45+ trips booked",
  },
  {
    id: "michael",
    name: "Michael Chen",
    role: "Business Executive",
    location: "San Francisco, USA",
    text: "I use Aero Search for all my business travel. The price alerts feature is a game-changer for my budget.",
    rating: 5,
    trips: "120+ trips booked",
  },
  {
    id: "emma",
    name: "Emma Williams",
    role: "Adventure Seeker",
    location: "London, UK",
    text: "Finding deals on flights has never been easier. Highly recommended for anyone who loves to travel!",
    rating: 5,
    trips: "78+ trips booked",
  },
  {
    id: "james",
    name: "James Rodriguez",
    role: "Travel Blogger",
    location: "Barcelona, Spain",
    text: "The best flight comparison tool I've used. Customer service is exceptional and responsive.",
    rating: 5,
    trips: "200+ trips booked",
  },
];

const Testimonial = () => {
  return (
    <AnimatedSection variants={fadeIn}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join millions of satisfied customers who trust Aero Search for their
            travel needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-indigo-300 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: "#fbbf24", fontSize: 18 }} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic grow text-sm leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900 text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-indigo-600 font-medium mb-1">
                  {testimonial.role}
                </p>
                <p className="text-xs text-gray-500">{testimonial.location}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {testimonial.trips}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Testimonial;
