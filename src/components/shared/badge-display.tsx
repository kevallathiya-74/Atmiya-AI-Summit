"use client";

import { motion } from "framer-motion";
import type { Badge } from "@/types";
import { Card } from "@/components/ui/card";
import { Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeDisplayProps {
  badges: Badge[];
  maxDisplay?: number;
  className?: string;
}

export function BadgeDisplay({
  badges,
  maxDisplay = 5,
  className,
}: BadgeDisplayProps) {
  const displayBadges = badges.slice(0, maxDisplay);
  const remainingCount = Math.max(0, badges.length - maxDisplay);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {displayBadges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
        >
          <div
            className={cn(
              "relative w-12 h-12 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-yellow-400 to-orange-500",
              "shadow-lg border-2 border-white",
              !badge.earnedAt && "opacity-50 grayscale"
            )}
            title={badge.nameGu || badge.name}
          >
            <Award className="w-6 h-6 text-white" />
            {!badge.earnedAt && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                <Lock className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </motion.div>
      ))}
      {remainingCount > 0 && (
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-600 font-semibold text-sm">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

interface BadgeCardProps {
  badge: Badge;
  onClick?: () => void;
}

export function BadgeCard({ badge, onClick }: BadgeCardProps) {
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-lg",
        !badge.earnedAt && "opacity-60"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div
          className={cn(
            "relative w-16 h-16 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md"
          )}
        >
          <Award className="w-8 h-8 text-white" />
          {!badge.earnedAt && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <Lock className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {badge.nameGu || badge.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {badge.descriptionGu || badge.description}
          </p>
          {badge.earnedAt && (
            <p className="text-xs text-green-600 mt-2">
              Earned {new Date(badge.earnedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
