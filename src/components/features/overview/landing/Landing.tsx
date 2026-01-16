"use client";

import React from "react";
import { Button } from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StarIcon from "@mui/icons-material/Star";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import GroupIcon from "@mui/icons-material/Group";

import Faqs from "../faqs/Faqs";

const Landing = () => {
  const features = [
    {
      id: "price",
      icon: <TrendingDownIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
      title: "Best Price Guarantee",
      description:
        "Find the lowest fares across all airlines with our advanced comparison engine. We match any lower price found elsewhere.",
    },
    {
      id: "security",
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
      title: "Secure Booking",
      description:
        "Your data is protected with industry-leading encryption and security protocols. PCI-DSS compliant payments.",
    },
    {
      id: "support",
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
      title: "24/7 Support",
      description:
        "Our dedicated team is always ready to help with any questions or concerns. Available via chat, email, and phone.",
    },
  ];

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

  const stats = [
    { number: "2M+", label: "Happy Travelers", icon: "✈️" },
    { number: "500K+", label: "Flights Daily", icon: "🛫" },
    { number: "180+", label: "Countries", icon: "🌍" },
    { number: "99.9%", label: "Uptime", icon: "⚡" },
  ];

  const destinations = [
    { city: "Paris", country: "France", flights: "2,450+", image: "🗼" },
    { city: "Tokyo", country: "Japan", flights: "1,890+", image: "🗾" },
    { city: "New York", country: "USA", flights: "3,120+", image: "🗽" },
    { city: "Dubai", country: "UAE", flights: "2,680+", image: "🏙️" },
    { city: "Sydney", country: "Australia", flights: "1,540+", image: "🦘" },
    { city: "Barcelona", country: "Spain", flights: "2,210+", image: "🏖️" },
  ];

  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Aero Search?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the future of flight booking with cutting-edge technology
            and unmatched service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-2xl hover:border-indigo-600 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
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

      {/* Testimonials Section */}
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
              <p className="text-gray-700 mb-6 italic flex-grow text-sm leading-relaxed">
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

      {/* CTA Section */}
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

      {/* How It Works Section */}
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

      {/* Premium Features Section */}
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

      {/* Popular Destinations Section */}
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

      {/* Newsletter Section */}
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

      <Faqs />
    </div>
  );
};

export default Landing;
