import { amadeusGet } from "@/src/lib/amadeus/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;

  const data = await amadeusGet("/v2/shopping/flight-offers", {
    originLocationCode: sp.get("origin")!,
    destinationIataCode: sp.get("destination")!,
    departureDate: sp.get("month")!, // YYYY-MM
    adults: sp.get("adults")!,
    max: sp.get("max")!,
    travelClass: sp.get("travelClass")!,
    returnDate: sp.get("returnDate")!,
    children: sp.get("children")!,
    infants: sp.get("infants")!,
    seniors: sp.get("seniors")!,
    youth: sp.get("youth")!,
    currencyCode: sp.get("currencyCode")!,
    cabinClass: sp.get("cabinClass")!,
    maxNumberOfConnections: sp.get("maxNumberOfConnections")!,
    departureTime: sp.get("departureTime")!,
    returnTime: sp.get("returnTime")!,
    maxNumberOfStops: sp.get("maxNumberOfStops")!,
    priceRange: sp.get("priceRange")!,
    includedAirlineCodes: sp.get("includedAirlineCodes")!,
  });

  return NextResponse.json(data);
}
