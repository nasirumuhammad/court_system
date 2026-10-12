import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import useAuthStore from "./store/authStore";
import useThemeStore from "./store/themeStore";

export default function App() {

  const {
    checkAuth,
    isCheckingAuth,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);


  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {

        document.documentElement.setAttribute(
          "data-theme",
          theme

        );
  }, [theme]);

  if (isCheckingAuth) {

    return (
      <div className="flex h-screen items-center justify-center">

        <span className="loading loading-spinner loading-lg"></span>

      </div>
    );

  }

  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}