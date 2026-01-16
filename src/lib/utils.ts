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
  obj: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value.trim() !== ""),
  );
}
