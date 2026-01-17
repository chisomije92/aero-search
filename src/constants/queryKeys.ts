export const QUERY_KEYS = {
  getOffersKey: (query: string) => ["offers", query],
  getAirlinesKey: (query: string) => ["airlines", query],
  getCheapestDatesKey: (query: string) => ["cheapest-dates", query],
  getCheapestDestinationsKey: (query: string) => [
    "cheapest-destinations",
    query,
  ],
  getLocationsKey: (query: string) => ["locations", query],
  getPriceMetricsKey: (query: string) => ["price-metrics", query],
};
