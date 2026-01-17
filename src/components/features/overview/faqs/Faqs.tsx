import { Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQS, useFaqs } from "@/src/hooks/useFaqs";
import { AnimatedSection } from "@/src/components/ui/AnimationSection";
import { fadeUp } from "@/src/lib/animations";

const Faqs = () => {
  const { expandedFaq, toggleFaq } = useFaqs();

  return (
    <AnimatedSection variants={fadeUp}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                  {faq.q}
                </h3>
                <IconButton
                  size="small"
                  sx={{
                    transform:
                      expandedFaq === faq.id
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    color: "#6366f1",
                    flexShrink: 0,
                    ml: 2,
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </div>
              <Collapse
                in={expandedFaq === faq.id}
                timeout="auto"
                unmountOnExit
              >
                <div className="px-6 pb-6 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Faqs;
