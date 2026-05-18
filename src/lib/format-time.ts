/**
 * Format a 24-hour `hour` (0–23) and optional `minute` (0–59) as a
 * 12-hour clock string like `3:00 PM` or `3:30 PM`.
 */
export function formatHour(hour: number, minute: number = 0): string {
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}
