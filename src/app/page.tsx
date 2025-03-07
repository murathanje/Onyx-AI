'use client';

import Chat from '@/components/Chat';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineCommandLine, HiOutlineCube, HiOutlineChartBar, HiOutlineSparkles, HiOutlineClock } from 'react-icons/hi2';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-950 relative pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold text-white">
                  AI Agent for <span className="text-green-200">MultiversX</span>
                </h1>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  Your intelligent assistant for exploring the MultiversX blockchain. Get instant answers about smart contracts, protocols, and real-time network insights powered by advanced AI.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <button className="group px-6 py-2.5 bg-green-200 text-neutral-900 rounded-lg font-medium hover:bg-green-300 transition-colors inline-flex items-center gap-2">
                    Get Insights Now
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: HiOutlineCommandLine,
                    title: "Natural Language Queries",
                    description: "Ask anything about MultiversX in plain language. From basic questions to complex technical queries about smart contracts, tokens, and protocols.",
                    features: ["Protocol explanations", "Transaction analysis", "Network status"]
                  },
                  {
                    icon: HiOutlineCube,
                    title: "Smart Contract Intelligence",
                    description: "Get detailed insights about smart contracts. Understand functionality, analyze security, and receive optimization suggestions.",
                    features: ["Code analysis", "Security checks", "Gas optimization"]
                  },
                  {
                    icon: HiOutlineChartBar,
                    title: "Real-time Analytics",
                    description: "Access current blockchain metrics and network statistics. Monitor transactions, analyze trends, and track protocol performance.",
                    features: ["Live metrics", "Token analytics", "Network health"]
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-green-200/20 transition-colors group"
                  >
                    <feature.icon className="w-6 h-6 text-green-200 mb-4" />
                    <h3 className="text-lg font-medium text-green-200 mb-3">{feature.title}</h3>
                    <p className="text-neutral-400 text-sm mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="text-neutral-500 text-sm flex items-center gap-2">
                          <span className="w-1 h-1 bg-green-200 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Marketing Banner */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-200/10 via-neutral-800/10 to-green-200/10 rounded-2xl" />
                <div className="relative p-8 md:p-12 rounded-2xl border border-neutral-800 backdrop-blur-sm">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-white">Ready to Explore MultiversX?</h2>
                      <p className="text-neutral-400">
                        Join thousands of developers and analysts using our AI agent for real-time blockchain insights.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                          <HiOutlineSparkles className="w-5 h-5 text-green-200" />
                          <span>Advanced AI Technology</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                          <HiOutlineClock className="w-5 h-5 text-green-200" />
                          <span>24/7 Real-time Analysis</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-sm text-neutral-400">Try these example queries:</p>
                        <div className="space-y-2">
                          {[
                            "Analyze the latest MultiversX smart contracts",
                            "Show network statistics for today",
                            "Explain the EGLD tokenomics"
                          ].map((query, idx) => (
                            <div 
                              key={idx}
                              className="p-2 bg-neutral-900/50 rounded-lg border border-neutral-800 text-sm text-neutral-300 hover:border-green-200/20 transition-colors cursor-pointer flex items-center justify-between group"
                            >
                              <span>{query}</span>
                              <HiArrowRight className="w-4 h-4 text-green-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Component */}
              <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
                <Chat />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
