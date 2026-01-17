export function getFormattedDate(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const formatTime = (dateTime: string) =>
  new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatDuration = (duration: string) =>
  duration.replace("PT", "").toLowerCase();

export const to24h = (t: string) => {
  const [, h, m, p] = t.match(/(\d+):(\d+)\s*(AM|PM)/i)!;
  const hours = (+h % 12) + (p.toUpperCase() === "PM" ? 12 : 0);
  return `${hours.toString().padStart(2, "0")}:${m}`;
};
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function parseTimeToMinutes(time: string): number | null {
  if (!time) return null;

  const trimmed = time.trim();

  if (trimmed.includes("T")) {
    const date = new Date(trimmed);
    if (isNaN(date.getTime())) return null;
    return date.getHours() * 60 + date.getMinutes();
  }
  const amPmMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (amPmMatch) {
    let hours = Number(amPmMatch[1]);
    const minutes = Number(amPmMatch[2]);
    const period = amPmMatch[3].toUpperCase();

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  const h24Match = trimmed.match(/^(\d{1,2}):(\d{2})$/);

  if (h24Match) {
    const hours = Number(h24Match[1]);
    const minutes = Number(h24Match[2]);
    return hours * 60 + minutes;
  }

  return null;
}

export function isWithinTime(flightTime: string, filterTime?: string): boolean {
  if (!filterTime) return true;
  const filterMinutes = parseTimeToMinutes(filterTime);
  if (filterMinutes === null) return true;
  return parseTimeToMinutes(flightTime)! >= filterMinutes;
}

export function isWithinPrice(price: number, range?: string): boolean {
  if (!range) return true;
  const [min, max] = range.split("-").map(Number);
  return price >= min && price <= max;
}

export function extractDate(iso: string): string {
  return iso.split("T")[0];
}

export function extractTime(iso: string): string {
  return iso.split("T")[1].slice(0, 5);
}

export function timeStringToHour(time: string): number {
  const [timePart, meridiem] = time.split(" ");
  const [rawHour] = timePart.split(":");
  let hour = Number(rawHour);

  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  }

  if (meridiem === "AM" && hour === 12) {
    hour = 24;
  }

  return hour;
}

export function getHourFromISO(iso: string): number {
  const date = new Date(iso);
  const hour = date.getHours();
  return hour === 0 ? 24 : hour;
}

export function parseHourRange(value?: string): number[] | null {
  if (!value) return null;

  const hours = value.split(",").map(Number);
  return hours.every((h) => h >= 1 && h <= 24) ? hours : null;
}

export function extractHourFromISO(iso: string): number {
  const timePart = iso.split("T")[1];
  const hour = Number(timePart.split(":")[0]);

  return hour === 0 ? 24 : hour;
}

export function extractMinutesFromISO(iso: string): number {
  const timePart = iso.split("T")[1];
  const [hour, minute] = timePart.split(":").map(Number);

  return hour * 60 + minute;
}

export function parseHourRangeToMinutes(
  value?: string,
): { start: number; end: number } | null {
  if (!value) return null;

  const parts = value.includes(",") ? value.split(",") : value.split("-");

  if (parts.length !== 2) return null;

  const startHour = Number(parts[0]);
  const endHour = Number(parts[1]);

  if (
    !Number.isInteger(startHour) ||
    !Number.isInteger(endHour) ||
    startHour < 0 ||
    endHour < 0 ||
    startHour > 24 ||
    endHour > 24 ||
    startHour > endHour
  ) {
    return null;
  }

  const startMinutes = startHour * 60;

  const endMinutes = endHour === 24 ? 24 * 60 - 1 : endHour * 60;

  return {
    start: startMinutes,
    end: endMinutes,
  };
}

export function parseDurationToMinutes(duration: string): number {
  let hours = 0;
  let minutes = 0;

  const hourMatch = duration.match(/(\d+)h/);
  const minuteMatch = duration.match(/(\d+)m/);

  if (hourMatch) hours = Number(hourMatch[1]);
  if (minuteMatch) minutes = Number(minuteMatch[1]);

  return hours * 60 + minutes;
}
