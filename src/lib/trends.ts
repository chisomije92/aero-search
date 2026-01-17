import { INormalizedFlightOffer } from "../types/offers";

type PriceProfile = {
  prices: number[];
};

export function buildDateRange(startDate: string, days: number) {
  const start = new Date(startDate);

  return Array.from({ length: days }).map((_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

// export function buildPriceProfile(flights: INormalizedFlightOffer[]) {
//   const prices = flights.map((f) => f.price).sort((a, b) => a - b);

//   return {
//     min: prices[0],
//     max: prices[prices.length - 1],
//     median: prices[Math.floor(prices.length / 2)],
//     prices,
//   };
// }

export function buildPastDayOffsets(days: number): number[] {
  return Array.from({ length: days }, (_, i) => days - 1 - i);
}

export function buildSpacedDayOffsets(points: number, step: number): number[] {
  return Array.from({ length: points }, (_, i) => (points - 1 - i) * step);
}

function buildZigZagPrices(prices: number[]): number[] {
  if (prices.length <= 2) return prices;

  const sorted = [...prices].sort((a, b) => a - b);
  const result: number[] = [];

  let left = 0;
  let right = sorted.length - 1;

  while (left <= right) {
    if (left === right) {
      result.push(sorted[left]);
    } else {
      result.push(sorted[Math.floor((left + right) / 2)]);
      result.push(sorted[left]);
      result.push(sorted[right]);
    }
    left++;
    right--;
  }

  return Array.from(new Set(result)).slice(0, prices.length);
}

export function buildPriceProfile(
  flights: INormalizedFlightOffer[],
): PriceProfile {
  const rawPrices = flights.map((f) => f.price);
  return {
    prices: buildZigZagPrices(rawPrices),
  };
}

export function priceForDay(profile: PriceProfile, dayIndex: number) {
  const { prices } = profile;

  return prices[dayIndex % prices.length];
}
