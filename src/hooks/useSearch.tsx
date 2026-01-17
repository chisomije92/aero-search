import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useQueryParams } from "./useQueryParams";

export const useSearch = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const searchQuery = getQueryParam("search");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setQueryParam("search", e.target.value);
  };

  return { searchQuery, searchTerm, debouncedSearchQuery, handleSearchQuery };
};
