import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCalendarDays(month: dayjs.Dayjs) {
  const startOfMonth = month.startOf("month");

  const startDate = startOfMonth.startOf("week"); // Sunday

  const days = [];
  let current = startDate;

  for (let i = 0; i < 49; i++) {
    days.push(current);
    current = current.add(1, "day");
  }

  return days;
}

export function cleanRecord(
  obj: Record<string, string | null | undefined>,
): Record<string, string> {
  const entries = Object.entries(obj).filter(
    (entry): entry is [string, string] =>
      typeof entry[1] === "string" && entry[1].trim() !== "",
  );

  return Object.fromEntries(entries) as Record<string, string>;
}

export function toQueryString(
  obj?: Record<string, string | null | undefined>,
): string {
  if (!obj) return "";
  return Object.entries(obj)
    .map(([key, value]) =>
      value === null || value === undefined || value === ""
        ? null
        : [key, value],
    )
    .filter((item): item is [string, string] => item !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
}
