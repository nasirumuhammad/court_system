import { FaMoon, FaSun } from "react-icons/fa6";

import useThemeStore from "../../store/themeStore";

const ThemeToggle = () => {

  const { theme, setTheme } = useThemeStore();

  const handleThemeToggle = () => {

    const newTheme =
      theme === "light"
        ? "dark"
        : "light";

    setTheme(newTheme);

  };

  return (
    <button
      className="btn btn-ghost btn-circle"
      onClick={handleThemeToggle}
    >

      {theme === "light" ? (
        <FaMoon className="text-lg" />
      ) : (
        <FaSun className="text-lg" />
      )}

    </button>
  );
};

export default ThemeToggle;