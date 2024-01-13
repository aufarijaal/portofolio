"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify-icon/react";

const ThemeToggleBtn: React.FC<{ additionalClasses?: string }> = ({
  additionalClasses,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`px-2 nav-item ${additionalClasses}`}
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "light" ? (
        <Icon icon="line-md:moon-to-sunny-outline-loop-transition" width="20" />
      ) : (
        <Icon icon="line-md:sunny-outline-to-moon-loop-transition" width="20" />
      )}
    </button>
  );
};
export default ThemeToggleBtn;
