import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-100 dark:bg-[#15171A] text-gray-700 dark:text-[#E7E7E7] hover:bg-gray-200 dark:hover:bg-[#1A1C1F] transition-colors"
        aria-label="Alternar tema"
        type="button"
      >
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-[#15171A] text-gray-700 dark:text-[#E7E7E7] hover:bg-gray-200 dark:hover:bg-[#1A1C1F] active:bg-gray-300 dark:active:bg-[#1F2124] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0E0F10]"
      aria-label={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      type="button"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
