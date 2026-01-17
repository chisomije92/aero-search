import { IMeta } from "./meta";

export interface IAirlines {
  type: string;
  iataCode: string;
  icaoCode: string;
  businessName: string;
  commonName: string;
}

export interface IAirlinesResponse {
  meta: IMeta;
  data: IAirlines[];
}
