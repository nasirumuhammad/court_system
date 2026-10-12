import { HiOutlineHome } from "react-icons/hi2";
import useAuthStore from "../../store/authStore";

const DashboardHero = () => {
  const { user } = useAuthStore();

  return (
    <div className="hero rounded-2xl bg-base-200">
      <div className="hero-content w-full justify-between py-8">

        <div>

          <div className="mb-4 flex items-center gap-3">

            <div className="rounded-xl bg-primary p-3 text-primary-content">
              <HiOutlineHome className="text-2xl" />
            </div>

            <h1 className="text-3xl font-bold">
              Welcome back, {user?.fullName?.split(" ")[0]}
            </h1>

          </div>

          <p className="max-w-xl text-base-content/70">
            Manage court cases, hearings, documents, users and reports from one centralized dashboard.
          </p>

        </div>

      </div>
    </div>
  );
};

export default DashboardHero;