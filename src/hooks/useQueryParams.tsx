import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getQueryParamArray = useCallback(
    (key: string): string[] => {
      const param = searchParams.get(key);
      if (!param) return [];

      try {
        // Handle comma-separated values or JSON array
        if (param.startsWith("[") && param.endsWith("]")) {
          return JSON.parse(param);
        }
        return param.split(",").filter(Boolean);
      } catch {
        return param.split(",").filter(Boolean);
      }
    },
    [searchParams]
  );

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const setQueryParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (
        value === null ||
        value === "" ||
        value === "all" ||
        value === "none"
      ) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const setQueryParamArray = useCallback(
    (key: string, values: string[] | Set<string> | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (
        !values ||
        (Array.isArray(values) && values.length === 0) ||
        (values instanceof Set && values.size === 0)
      ) {
        params.delete(key);
      } else {
        const arrayValues = Array.isArray(values) ? values : Array.from(values);
        // Use comma-separated for better URL readability
        params.set(key, arrayValues.join(","));
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const setMultipleQueryParams = useCallback(
    (paramsObj: Record<string, string | string[] | Set<string> | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(paramsObj).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          params.delete(key);
        } else if (Array.isArray(value) || value instanceof Set) {
          const arrayValues = Array.isArray(value) ? value : Array.from(value);
          if (arrayValues.length === 0) {
            params.delete(key);
          } else {
            params.set(key, arrayValues.join(","));
          }
        } else {
          params.set(key, value as string);
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const removeQueryParam = useCallback(
    (key: string) => {
      setQueryParam(key, null);
    },
    [setQueryParam]
  );

  const removeAllQueryParams = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return useMemo(
    () => ({
      getQueryParam,
      getQueryParamArray,
      setQueryParam,
      setQueryParamArray,
      setMultipleQueryParams,
      removeQueryParam,
      updateParams,
      removeAllQueryParams,
      searchParams,
    }),
    [
      getQueryParam,
      updateParams,
      getQueryParamArray,
      setQueryParam,
      setQueryParamArray,
      setMultipleQueryParams,
      removeQueryParam,
      removeAllQueryParams,
      searchParams,
    ]
  );
};
