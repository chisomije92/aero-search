import { useState } from "react";

export const FAQS = [
  {
    id: "faq-1",
    q: "How do I find the cheapest flights?",
    a: "Use our advanced filters to compare prices across all airlines. Set price alerts to get notified when fares drop for your desired routes.",
  },
  {
    id: "faq-2",
    q: "Can I change or cancel my booking?",
    a: "Yes! With our flexible booking options, you can change or cancel your flights with zero penalties. Terms apply based on your ticket type.",
  },
  {
    id: "faq-3",
    q: "Is my payment information secure?",
    a: "Absolutely. We use industry-leading encryption and are PCI-DSS compliant. Your payment data is never stored on our servers.",
  },
  {
    id: "faq-4",
    q: "Do you offer travel insurance?",
    a: "Yes, we offer comprehensive travel insurance options at checkout. Protect yourself against unexpected cancellations and emergencies.",
  },
];

export const useFaqs = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (index: string) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return { expandedFaq, toggleFaq };
};
