import { AERO_URLS } from "../constants/aeroUrls";
import { ClientAxios } from "../lib/amadeus/client-axios";
import { handleApiError } from "../lib/errorHelper";

export const getOffers = async (params?: Record<string, string>) => {
  try {
    const { data } = await ClientAxios.get(AERO_URLS.offers, {
      params,
    });
    return data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getAirlines = async (params?: Record<string, string>) => {
  try {
    const { data } = await ClientAxios.get(AERO_URLS.airlines, {
      params,
    });
    return data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const cheapestDates = async (params?: Record<string, string>) => {
  try {
    const { data } = await ClientAxios.get(AERO_URLS.cheapestDates, {
      params,
    });
    return data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getCheapestDestinations = async (
  params?: Record<string, string>,
) => {
  try {
    const { data } = await ClientAxios.get(AERO_URLS.cheapestDestinations, {
      params,
    });
    return data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getLocations = async (params?: Record<string, string>) => {
  try {
    const { data } = await ClientAxios.get(AERO_URLS.locations, {
      params,
    });
    return data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getPriceMetrics = async (params?: Record<string, string>) => {
  try {
    const { data } = await ClientAxios.get(AERO_URLS.priceMetrics, {
      params,
    });
    return data;
  } catch (err) {
    throw handleApiError(err);
  }
};
