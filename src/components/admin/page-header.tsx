"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode | {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      {action && (
        typeof action === 'object' && 'label' in action ? (
          <Button
            onClick={action.onClick}
            className="bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700 transition-all"
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        ) : (
          action
        )
      )}
    </div>
  );
}
