import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import PageLoader from "../components/common/PageLoader";

const ProtectedRoute = () => {
  
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;