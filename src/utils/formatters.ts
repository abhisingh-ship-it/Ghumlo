import confetti from 'canvas-confetti';

export function formatINR(amount: number, currency: string = 'INR'): string {
  const rounded = Math.round(amount || 0);

  if (currency === 'INR') {
    // Standard Indian number formatting: ₹1,50,000
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(rounded);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateRange(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return '';
  try {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return `${startDate} – ${endDate}`;

    const sDay = s.getDate();
    const sMonth = s.toLocaleDateString('en-IN', { month: 'short' });
    const sYear = s.getFullYear();

    const eDay = e.getDate();
    const eMonth = e.toLocaleDateString('en-IN', { month: 'short' });
    const eYear = e.getFullYear();

    if (sYear === eYear && sMonth === eMonth) {
      return `${sDay} – ${eDay} ${sMonth} ${sYear}`;
    }
    if (sYear === eYear) {
      return `${sDay} ${sMonth} – ${eDay} ${eMonth} ${sYear}`;
    }
    return `${sDay} ${sMonth} ${sYear} – ${eDay} ${eMonth} ${eYear}`;
  } catch {
    return `${startDate} – ${endDate}`;
  }
}

export function calculateDaysCount(start: string, end: string): number {
  if (!start || !end) return 1;
  try {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diff);
  } catch {
    return 1;
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'upcoming':
      return 'Upcoming Trip';
    case 'ongoing':
      return 'Ongoing Adventure';
    case 'completed':
      return 'Completed';
    case 'planning':
    default:
      return 'In Planning';
  }
}

export function getCategoryBadgeColor(category: string): { bg: string; text: string; border: string } {
  switch (category.toLowerCase()) {
    case 'transport':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'accommodation':
      return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' };
    case 'food':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'activities':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'localTravel':
    case 'localtravel':
      return { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' };
    case 'shopping':
      return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
    case 'emergency':
      return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
  }
}

export function triggerTripCelebration() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF8748', '#2878D0', '#36B7A0', '#142B4A', '#FFD166'],
  });
}
