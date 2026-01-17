import { cn } from "@/src/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isPending?: boolean;
  //   totalItems?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  isPending,
  //   totalItems,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
  className = "",
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newItemsPerPage = parseInt(event.target.value);
    onItemsPerPageChange?.(newItemsPerPage);
    // Reset to first page when changing items per page
    //onPageChange?.(1);
  };

  return (
    <div
      className={cn(
        `flex justify-end gap-3 items-center flex-wrap border-t border-gray-300 pt-4 mt-4 text-gray-600 `,
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="min-w-fit">Items per page:</span>
        <select
          // value={isPending ? "-" : itemsPerPage}
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          disabled={isPending}
          title="items per page"
          className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 items-center">
        <button
          className="w-auto h-auto"
          onClick={handlePrevious}
          disabled={currentPage <= 1 || isPending}
        >
          Prev
        </button>
        <span>
          Page {isPending ? "-" : currentPage} of {isPending ? "-" : totalPages}
        </span>
        <button
          className="w-auto h-auto"
          onClick={handleNext}
          disabled={currentPage >= totalPages || isPending}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
