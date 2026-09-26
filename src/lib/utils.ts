export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatPhone(phone: string | null): string {
  if (!phone) return '';
  return phone;
}

export function getDirectionsUrl(lat: number | null, lng: number | null, address?: string | null): string {
  if (lat && lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  if (address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  }
  return '#';
}

export function getMapsUrl(lat: number | null, lng: number | null, address?: string | null): string {
  if (lat && lng) {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }
  if (address) {
    return `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  }
  return '#';
}

export function getWhatsAppUrl(phone: string | null): string {
  if (!phone) return '#';
  const cleaned = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/91${cleaned}`;
}

export function getTelUrl(phone: string | null): string {
  if (!phone) return '#';
  return `tel:${phone.replace(/\s/g, '')}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getSessionId(): string {
  let id = localStorage.getItem('cip-session-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('cip-session-id', id);
  }
  return id;
}

export function isCollegeOpen(workingHours: string): boolean {
  const now = new Date();
  const day = now.getDay();
  if (day === 0) return false;
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  return currentMinutes >= 540 && currentMinutes <= 1020;
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}
