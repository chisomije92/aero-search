import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { fadeUp } from "@/src/lib/animations";
import { Button } from "@mui/material";
import React from "react";

const CTA = () => {
  return (
    <AnimatedSection variants={fadeUp}>
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 text-center text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Perfect Flight?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Start exploring amazing destinations and save up to 50% on your next
            trip
          </p>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#6366f1",
              fontWeight: 600,
              px: 6,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "#f3f4f6",
              },
            }}
          >
            Start Searching Now
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CTA;
