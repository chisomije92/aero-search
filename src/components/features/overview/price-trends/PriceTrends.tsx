import { useGetOffers } from "@/src/hooks/useGetOffers";
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
  const { simulatedTrendData, priceStats, isPending } = useGetOffers();
  const priceInsight =
    priceStats &&
    {
      cheap: {
        color: "bg-green-500",
        title: "Prices are lower than usual for your search",
      },
      typical: {
        color: "bg-blue-500",
        title: "Prices are currently typical for your search",
      },
      expensive: {
        color: "bg-red-500",
        title: "Prices are higher than usual for your search",
      },
    }[priceStats.status];
  console.log("price trend data", simulatedTrendData);
  return (
    <Paper elevation={3} className="rounded-2xl overflow-hidden">
      <div className="p-6">
        {priceStats && priceInsight && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${priceInsight.color}`} />
              <span className="text-sm font-medium text-gray-700">
                {priceInsight.title}
              </span>
            </div>

            <p className="text-xs text-gray-500 ml-5">
              The least expensive flights for similar trips usually cost between{" "}
              {priceStats.currency} {priceStats.min}–{priceStats.currency}{" "}
              {priceStats.max}.
            </p>
          </div>
        )}
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={simulatedTrendData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="label"
              stroke="#6b7280"
              style={{ fontSize: "0.875rem" }}
            />

            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "0.875rem" }}
              // tickFormatter={(value: number) =>
              //   simulatedTrendData.length
              //     ? `${simulatedTrendData[0].currency} ${value}`
              //     : String(value)
              // }
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value, _, { payload }) =>
                payload && value !== undefined
                  ? [`${payload.currency} ${value}`, "Price"]
                  : ["N/A", "Price"]
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
