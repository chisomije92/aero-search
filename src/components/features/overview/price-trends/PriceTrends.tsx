import { Paper } from "@mui/material";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockPriceTrends = [
  { day: "Mon", price: 285 },
  { day: "Tue", price: 295 },
  { day: "Wed", price: 270 },
  { day: "Thu", price: 310 },
  { day: "Fri", price: 340 },
  { day: "Sat", price: 380 },
  { day: "Sun", price: 320 },
];

const PriceTrends = () => {
  return (
    <Paper elevation={3} className="rounded-2xl overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Price Trends</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-700">
              Prices are currently typical for your search
            </span>
          </div>
          <p className="text-xs text-gray-500 ml-5">
            The least expensive flights for similar trips usually cost between
            $265–$450.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={mockPriceTrends}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              style={{ fontSize: "0.875rem" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "0.875rem" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number | undefined) =>
                value !== undefined ? [`$${value}`, "Price"] : ["N/A", "Price"]
              }
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default PriceTrends;
