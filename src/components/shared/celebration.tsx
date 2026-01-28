"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CelebrationProps {
  type: "xp" | "level-up" | "badge" | "streak";
  message: string;
  messageGu?: string;
  show: boolean;
  onComplete?: () => void;
}

export function Celebration({
  type,
  message,
  messageGu,
  show,
  onComplete,
}: CelebrationProps) {
  useEffect(() => {
    if (show) {
      // Trigger confetti
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      }, 250);

      // Auto-dismiss after 3 seconds
      const timeout = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl px-8 py-6 max-w-md text-center pointer-events-auto"
          >
            <h2 className="text-3xl font-bold mb-2">{message}</h2>
            {messageGu && <p className="text-xl font-gujarati">{messageGu}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
