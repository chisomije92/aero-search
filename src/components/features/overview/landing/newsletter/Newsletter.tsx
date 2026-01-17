import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { Button } from "@mui/material";

const Newsletter = () => {
  return (
    <AnimatedSection>
      <div className="bg-linear-to-r from-indigo-50 to-purple-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Stay Updated on Flight Deals
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Subscribe to our newsletter and get exclusive offers delivered to
            your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6366f1",
                color: "white",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 1,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "#4f46e5",
                },
              }}
            >
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Newsletter;
