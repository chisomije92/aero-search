import { amadeusAxios } from "./axios";
import { getAmadeusToken } from "./auth";
import { cleanRecord } from "../utils";

export async function amadeusGet<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  try {
    const token = await getAmadeusToken();

    const { data } = await amadeusAxios.get<T>(endpoint, {
      params: params && cleanRecord(params),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("AMADEUS GET", data);

    return data;
  } catch (err) {
    throw err;
  }
}
