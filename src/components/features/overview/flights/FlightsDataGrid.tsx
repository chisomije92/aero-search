import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { useGetOffers } from "@/src/hooks/useGetOffers";
import { useDrawer } from "@/src/hooks/useDrawer";
import { getFormattedDate } from "@/src/lib/dateHelper";
import { useQueryParams } from "@/src/hooks/useQueryParams";

const FlightsDataGrid = () => {
  const { normalizedDataOffers, isPending } = useGetOffers();
  const { open } = useDrawer();
  const { getQueryParam } = useQueryParams();
  const startDate = getQueryParam("startDate");

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    open("selectFlight", params.row);
  };

  const columns: GridColDef[] = [
    {
      field: "airline",
      headerName: "Airline",
      width: 120,
      sortable: false,
      renderCell: (params) => params.row.outbound.airline,
    },
    {
      field: "flightNumber",
      headerName: "Flight",
      width: 100,
      sortable: false,
      renderCell: (params) => params.row.outbound.flightNumber,
    },
    {
      field: "route",
      headerName: "Route",
      width: 120,
      sortable: false,
      renderCell: (params) =>
        `${params.row.outbound.origin} → ${params.row.outbound.destination}`,
    },
    {
      field: "departure",
      headerName: "Departure",
      width: 150,
      sortable: false,
      renderCell: (params) => params.row.outbound.departureTimeLabel,
    },
    {
      field: "arrival",
      headerName: "Arrival",
      width: 150,
      sortable: false,
      renderCell: (params) => params.row.outbound.arrivalTimeLabel,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
      sortable: false,
      renderCell: (params) => params.row.outbound.duration,
    },
    {
      field: "stops",
      headerName: "Stops",
      width: 80,
      sortable: false,
      renderCell: (params) => `${params.row.outbound.stops}`,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      sortable: true,
      renderCell: (params) => `${params.row.currency} ${params.row.price}`,
    },
  ];

  const rows = normalizedDataOffers.map((offer) => ({
    ...offer,
  }));

  return (
    <Paper elevation={3} className="rounded-2xl overflow-hidden">
      <h3 className="text-xl font-bold text-black px-6 py-4">
        {normalizedDataOffers?.length > 0 && normalizedDataOffers.length}{" "}
        Available Flights for {getFormattedDate(new Date(startDate || ""))}
      </h3>
      <div className="h-200overflow-auto w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isPending}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20, page: 0 },
            },
            sorting: {
              sortModel: [{ field: "price", sort: "asc" }],
            },
          }}
          onRowClick={handleRowClick}
          sx={{
            border: "none",
            cursor: "pointer",
            "& .MuiDataGrid-row": {
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f3f4f6",
                boxShadow: "0 2px 8px rgba(99, 102, 241, 0.1)",
              },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: 600,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },
          }}
          slots={{
            noRowsOverlay: () => (
              <h3 className="text-xl font-bold text-black px-6 py-4 flex justify-center">
                No Flights Found
              </h3>
            ),
          }}
        />
      </div>
    </Paper>
  );
};

export default FlightsDataGrid;
