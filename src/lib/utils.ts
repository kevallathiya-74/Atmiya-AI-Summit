import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("gu-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "સુપ્રભાત"; // Good morning
  if (hour < 17) return "નમસ્તે"; // Good afternoon
  return "શુભ સાંજ"; // Good evening
}
