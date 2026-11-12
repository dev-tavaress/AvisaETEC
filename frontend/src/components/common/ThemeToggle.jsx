import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar modo escuro"
      title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      className={`p-2 rounded-md text-slate-600 hover:text-red-800 bg-slate-100 hover:bg-red-50 transition-colors ${className}`}
    >
      {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
    </button>
  );
}
