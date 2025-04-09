import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../Contexts/ThemeContext/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="bg-transparent rounded-full border dark:border-gray-300 border-gray-600 text-yellow-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
