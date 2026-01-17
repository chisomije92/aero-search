import { amadeusGet } from "@/src/lib/amadeus/client";
import { customErrorHelper } from "@/src/lib/errorHelper";
import { IError } from "@/src/types/error";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams;

    const data = await amadeusGet("/v1/shopping/flight-dates", {
      origin: sp.get("origin")!,
      destination: sp.get("destination")!,
    });

    return NextResponse.json(data);
  } catch (error) {
    const customError = error as IError;

    return customErrorHelper(customError);
  }
}
