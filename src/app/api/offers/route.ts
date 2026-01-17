import { amadeusGet } from "@/src/lib/amadeus/client";
import { customErrorHelper } from "@/src/lib/errorHelper";
import { IError } from "@/src/types/error";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams;
    const data = await amadeusGet("/v2/shopping/flight-offers", {
      originLocationCode: sp.get("originLocationCode")!,
      destinationLocationCode: sp.get("destinationLocationCode")!,
      departureDate: sp.get("departureDate")!,
      returnDate: sp.get("returnDate")!,
      adults: sp.get("adults")!,
      max: sp.get("max")!,
      children: sp.get("children")!,
      infants: sp.get("infants")!,
    });

    return NextResponse.json(data);
  } catch (error) {
    const customError = error as IError;
    return customErrorHelper(customError);
  }
}
