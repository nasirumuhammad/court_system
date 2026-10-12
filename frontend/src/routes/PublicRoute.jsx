import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import PageLoader from "../components/common/PageLoader";

const PublicRoute = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;