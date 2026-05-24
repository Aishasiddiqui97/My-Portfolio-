import { useTheme } from '@/components/ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-[#0F0B1F]/30 border border-[#00E5C4]/30 text-[#00E5C4] hover:bg-[#00E5C4]/10 transition-all duration-300 hover:scale-110"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
