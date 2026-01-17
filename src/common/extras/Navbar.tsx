import NotificationsIcon from "@mui/icons-material/Notifications";
import { useModal } from "@/src/hooks/useModal";
import Plane from "@/src/components/ui/icons/Plane";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import Link from "next/link";

const Navbar = () => {
  const { open: openModal } = useModal();
  const { getQueryParam } = useQueryParams();
  const origin = getQueryParam("origin");
  const destination = getQueryParam("destination");
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 text-white">
        <div className="p-2 bg-[#4f46e5] rounded-lg text-white">
          <Plane />
        </div>
        <span className="font-serif text-2xl font-bold tracking-wide hidden md:inline">
          Aero Search
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
        {origin && destination && origin !== destination && (
          <button
            onClick={() =>
              openModal("setAlert", {
                origin,
                destination,
              })
            }
            className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/30 transition-all"
          >
            <NotificationsIcon fontSize="small" />
            Price Alerts
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
