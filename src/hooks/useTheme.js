import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Получаем значение из localStorage при первой загрузке
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Проверяем системные предпочтения
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Сохраняем выбранную тему в localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleTheme };
}
