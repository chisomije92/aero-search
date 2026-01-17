import { amadeusGet } from "@/src/lib/amadeus/client";
import { customErrorHelper } from "@/src/lib/errorHelper";
import { IError } from "@/src/types/error";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams;

    const data = await amadeusGet("/v2/shopping/flight-offers", {
      originLocationCode: sp.get("origin")!,
      destinationIataCode: sp.get("destination")!,
      departureDate: sp.get("departureDate")!,
      returnDate: sp.get("returnDate")!,
      adults: sp.get("adults")!,
      max: sp.get("max")!,
      travelClass: sp.get("travelClass")!,
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
      nonStop: sp.get("nonStop")!,
    });

    return NextResponse.json(data);
  } catch (error) {
    const customError = error as IError;
    return customErrorHelper(customError);
  }
}
