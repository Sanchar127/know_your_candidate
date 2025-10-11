"use client";

import Hero from "../components/Hero";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Candidate Overview",
      description: "Get detailed profiles including background, policies, achievements, and track records to understand each candidate thoroughly.",
      icon: "/icons/overview.svg",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      stats: "500+ Profiles"
    },
    {
      title: "Policy Comparison",
      description: "Compare candidates side by side across key issues. Make data-driven decisions with our intelligent comparison tools.",
      icon: "/icons/policies.svg",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      stats: "50+ Categories"
    },
    {
      title: "Community Engagement",
      description: "See how candidates interact with communities, their responsiveness, and commitment to public service.",
      icon: "/icons/engage.svg",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      stats: "10K+ Interactions"
    }
  ];

  return (
    <div className="font-sans bg-gradient-to-br from-slate-50 via-white to-indigo-25 min-h-screen">

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Why Choose VoteVision
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Everything You Need to
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Vote Confidently
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive tools and insights to help you make informed voting decisions 
              with confidence and clarity.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 p-8 transform transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-105 h-full flex flex-col">
                  
                  {/* Icon Container */}
                  <div className={`relative mb-6 inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={48}
                      height={48}
                      className="relative z-10 filter brightness-0 invert"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Stats Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100/80 text-sm font-medium text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                      {feature.stats}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
                </div>

                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 -z-20 group-hover:scale-110`}></div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`text-center mt-16 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Ready to Make an Informed Decision?
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Join thousands of voters who trust VoteVision for transparent, comprehensive election insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Exploring
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group relative bg-white/80 text-gray-700 font-semibold px-8 py-4 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Watch Demo
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "500+", label: "Candidates" },
              { number: "100+", label: "Constituencies" },
              { number: "95%", label: "User Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-600 {
          animation-delay: 600ms;
        }
        .delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </div>
  );
}