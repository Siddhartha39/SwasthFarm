import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export function calculateTHI(tempC: number, relativeHumidity: number): {
  thi: number;
  stressLevel: 'normal' | 'mild' | 'moderate' | 'severe';
  color: string;
} {
  // NRC formula for Temperature-Humidity Index (THI):
  // THI = (1.8 * T + 32) - (0.55 - 0.0055 * RH) * (1.8 * T - 26)
  const thi = Math.round(((1.8 * tempC + 32) - (0.55 - 0.0055 * relativeHumidity) * (1.8 * tempC - 26)) * 10) / 10;
  
  let stressLevel: 'normal' | 'mild' | 'moderate' | 'severe' = 'normal';
  let color = '#10b981'; // green

  if (thi >= 84) {
    stressLevel = 'severe';
    color = '#ef4444'; // red
  } else if (thi >= 79) {
    stressLevel = 'moderate';
    color = '#f97316'; // orange
  } else if (thi >= 72) {
    stressLevel = 'mild';
    color = '#eab308'; // yellow
  }

  return { thi, stressLevel, color };
}

export function getSpeciesEmoji(species: string): string {
  switch (species.toLowerCase()) {
    case 'cattle':
    case 'cow':
      return '🐄';
    case 'buffalo':
      return '🐃';
    case 'goat':
      return '🐐';
    case 'sheep':
      return '🐑';
    case 'poultry':
    case 'chicken':
      return '🐓';
    default:
      return '🐾';
  }
}

export function getRiskBadgeClasses(riskLevel: string): string {
  switch (riskLevel.toLowerCase()) {
    case 'low':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    case 'moderate':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    case 'high':
    case 'critical':
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    default:
      return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
  }
}

export function getHealthStatusClasses(status: string): string {
  switch (status.toLowerCase()) {
    case 'healthy':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    case 'monitoring':
      return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
    case 'attention':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    case 'quarantine':
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    default:
      return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
  }
}
