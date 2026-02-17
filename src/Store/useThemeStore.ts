import { create } from "zustand";

interface ThemeStore {
  theme: "light" | "dark";
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "dark",

  initializeTheme: () => {
    // Check localStorage first, fallback to dark
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "dark";

    // Apply to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update state
    set({ theme: savedTheme });
  },

  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark";

    // Update document class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", newTheme);

    // Update state
    set({ theme: newTheme });
  },
}));
