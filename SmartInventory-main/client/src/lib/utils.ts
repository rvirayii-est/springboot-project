import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  
  return new Intl.NumberFormat("en-US").format(value);
}

export function isLowStock(quantity: number, threshold: number | null | undefined): boolean {
  if (threshold === null || threshold === undefined) return false;
  return quantity < threshold;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getInitials(name: string): string {
  if (!name) return "";
  
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export function getStockStatusColor(quantity: number, threshold: number | null | undefined): string {
  if (threshold === null || threshold === undefined) return "bg-neutral-100 text-neutral-800";
  
  if (quantity <= 0) return "bg-destructive/10 text-destructive";
  if (quantity < threshold) return "bg-warning/10 text-warning";
  return "bg-success/10 text-success";
}

export function getTimeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  
  return past.toLocaleDateString();
}
