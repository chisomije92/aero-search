"use client";

import Faqs from "../faqs/Faqs";
import Stats from "./stats/Stats";
import Testimonial from "./testimonial/Testimonial";
import CTA from "./cta/CTA";
import HowItWorks from "./how-it-works/HowItWorks";
import PremiumFeatures from "./premium-features/PremiumFeatures";
import PopularDestinations from "./popular-destinations/PopularDestinations";
import Newsletter from "./newsletter/Newsletter";
import ChooseAero from "./choose-aero/ChooseAero";

const Landing = () => {
  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      <ChooseAero />
      <Stats />

      <Testimonial />
      <CTA />

      <HowItWorks />

      <PremiumFeatures />

      <PopularDestinations />
      <Newsletter />

      <Faqs />
    </div>
  );
};

export default Landing;
