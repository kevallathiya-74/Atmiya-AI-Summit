"use client";

interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
}

const variantStyles = {
  success: "bg-green-100 text-green-800 ring-green-600/20",
  warning: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
  error: "bg-red-100 text-red-800 ring-red-600/20",
  info: "bg-blue-100 text-blue-800 ring-blue-600/20",
  neutral: "bg-gray-100 text-gray-800 ring-gray-600/20",
};

export function StatusBadge({ status, variant = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${variantStyles[variant]}`}
    >
      {status}
    </span>
  );
}
