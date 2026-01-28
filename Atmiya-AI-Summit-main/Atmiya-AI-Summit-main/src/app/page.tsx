"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, GraduationCap } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 space-y-12">
        {/* Logo and Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-2xl shadow-2xl">
              <GraduationCap
                className="w-16 h-16 text-white"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Product Name */}
          <div className="text-center space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              GayanSetu.AI
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-2 text-xl md:text-2xl font-gujarati text-gray-700"
            >
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>તમારો AI શિક્ષક</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-base md:text-lg text-gray-600 font-gujarati max-w-md"
            >
              ગુજરાતીમાં શીખો, AI સાથે આગળ વધો
            </motion.p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6"
        >
          <Button
            onClick={() => router.push("/login")}
            variant="outline"
            size="lg"
            className="w-full sm:w-48 h-12 text-base font-medium border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span className="font-gujarati">લૉગિન</span>
          </Button>

          <Button
            onClick={() => router.push("/login?signup=true")}
            size="lg"
            className="w-full sm:w-48 h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="font-gujarati">શરૂ કરો</span>
          </Button>
        </motion.div>

        {/* Projects & APIs Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-6"
        >
          <Button
            onClick={() => router.push("/projects")}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            🤖 View All AI Projects & APIs
          </Button>
          <Button
            onClick={() => router.push("/api-playground")}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            🔧 API Playground
          </Button>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm text-gray-500 text-center font-gujarati"
        >
          વિદ્યાર્થીઓ, શિક્ષકો અને વહીવટકર્તાઓ માટે
        </motion.p>
      </div>
    </div>
  );
}
