export function formatAmount(amount: any) {
    if (typeof amount === "string") {
        amount = parseFloat(amount);
    }

    if (isNaN(amount)) {
        return "Invalid number";
    }

    // Round to nearest thousand
    const roundedAmount = Math.round(amount / 1000) * 1000;

    return roundedAmount.toLocaleString();
}

/** @deprecated Use avatarUrl() instead – dummyImage() generates a new random URL on every render */
export function dummyImage() {
    return `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1}.jpg`;
}

const STORAGE_BASE = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage';

/**
 * Converts a relative storage path (e.g. "profile_pictures/abc.jpg") into a full URL.
 * Already-absolute URLs (http/https/data:) are returned unchanged.
 * Returns null for falsy inputs.
 */
export function storageUrl(path?: string | null): string | null {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }
    const cleanBase = STORAGE_BASE.replace(/\/+$/, '');
    // Strip leading /storage/ prefix if present (the base URL already includes /storage)
    let cleanPath = path.replace(/^\/+/, '');
    if (cleanPath.startsWith('storage/')) {
        cleanPath = cleanPath.substring('storage/'.length);
    }
    return `${cleanBase}/${cleanPath}`;
}

/**
 * Returns the real profile picture URL when one exists, otherwise falls back to a
 * stable generated avatar (consistent initials-based image, no random flickering).
 */
export function avatarUrl(picture?: string | null, name?: string | null): string {
    const resolved = storageUrl(picture);
    if (resolved) return resolved;
    const initials = encodeURIComponent((name || 'User').trim() || 'User');
    return `https://ui-avatars.com/api/?name=${initials}&background=fee2e2&color=ef4444&bold=true&size=128`;
}
/**
 * Returns a Date threshold for date-range filtering based on dropdown filter values.
 * Returns null for 'all' or unrecognized values (meaning no filter).
 */
export function getDateThreshold(filterValue: string): Date | null {
    const now = new Date();
    switch (filterValue) {
        case 'today': {
            const d = new Date(now);
            d.setHours(0, 0, 0, 0);
            return d;
        }
        case '7':   return new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000);
        case '30':  return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        case '365': return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        default:    return null;
    }
}

export function formatCreatedAt(timestamp : any) {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2);

    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} - ${hours}:${minutes} ${amPm}`;
}