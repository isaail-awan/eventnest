export function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(iso) {
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
}

// Booking ka display status: cancelled/confirmed sab se pehle, warna pending
export function getStatus(booking) {
  if (booking.status === "cancelled") return "cancelled";
  if (booking.status === "confirmed") return "confirmed";
  return "pending";
}

export const STATUS_ORDER = ["pending", "confirmed", "cancelled"];

export const statusLabels = { pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled" };

export const statusStyles = {
  pending: "bg-terracotta/10 text-terracotta",
  confirmed: "bg-sage/10 text-sage",
  cancelled: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

export const statusDots = { pending: "bg-terracotta", confirmed: "bg-sage", cancelled: "bg-red-500" };