import { useRouter, useSearchParams } from "next/navigation";

interface usePaginationProps {
  initialPage?: number;
  pageSize?: number;
  pageParam?: string;
  pageSizeParam?: string;
}

export const usePagination = ({
  initialPage = 1,
  pageSize = 10,
  pageParam = "page",
  pageSizeParam = "pageSize",
}: usePaginationProps = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageSize = Number(searchParams.get(pageSizeParam)) || pageSize;

  const currentPage = Number(searchParams.get(pageParam)) || initialPage;

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`?${params.toString()}`);
  };

  const goToNextPage = (totalPages?: number) => {
    if (!totalPages || currentPage < totalPages) {
      updateParams({ [pageParam]: String(currentPage + 1) });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      updateParams({ [pageParam]: String(currentPage - 1) });
    }
  };

  const goToSpecificPage = (page: number, totalPages?: number) => {
    if (page >= 1 && (!totalPages || page <= totalPages)) {
      updateParams({ [pageParam]: String(page) });
    }
  };

  const handlePageChange = (page: number) => {
    updateParams({ [pageParam]: String(page) });
  };

  const handlePageSizeChange = (pageSize: number) => {
    updateParams({ [pageSizeParam]: String(pageSize) });
  };

  const getDisabledStates = (totalPages?: number) => ({
    isNextDisabled: !totalPages || currentPage >= totalPages,
    isPrevDisabled: currentPage <= 1,
  });

  return {
    currentPage,
    currentPageSize,
    goToNextPage,
    goToPreviousPage,
    goToSpecificPage,
    handlePageChange,
    getDisabledStates,
    handlePageSizeChange,
    updateParams,
  };
};
