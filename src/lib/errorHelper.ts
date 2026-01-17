import { NextResponse } from "next/server";
import { AmadeusError, IError } from "../types/error";
import axios from "axios";

export const customErrorHelper = (error: IError) => {
  if (error.type === "AMADEUS_ERROR") {
    return NextResponse.json(
      { errors: error.errors },
      { status: error.status },
    );
  }

  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 },
  );
};

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as AmadeusError | undefined;

    if (status === 401) {
      return "Session expired. Please sign in again.";
    }

    if (status === 403) {
      return "You do not have permission to perform this action.";
    }

    if (data?.errors?.length) {
      const firstError = data.errors[0];

      if (firstError.detail) {
        return firstError.source?.parameter
          ? `${firstError.source.parameter}: ${firstError.detail}`
          : firstError.detail;
      }

      if (firstError.title) {
        return firstError.title;
      }
    }

    if (data?.message) {
      return data.message;
    }

    if (!error.response) {
      return "Network error. Please check your internet connection.";
    }

    return "Something went wrong while fetching flight data.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};
