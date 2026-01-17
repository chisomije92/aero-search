export interface ILocation {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self: {
    href: string;
    methods: "GET" | "POST"[];
  };
  timeZoneOffset: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    stateCode: string;
    regionCode: string;
  };
  analytics: {
    travelers: {
      score: string;
    };
  };
}

export interface ILocationMeta {
  count: number;
  links: {
    self: string;
  };
}

export interface ILocationResponse {
  data: ILocation[];
  meta: ILocationMeta;
}
