import { type FC, type SVGProps } from "react";

// Icon Props Type
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// Project Interface
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
}

// Social Link Interface
export interface SocialLink {
  name: string;
  url: string;
  icon: FC<IconProps>;
}

// Navigation Link Interface
export interface NavLink {
  name: string;
  path: string;
  icon: FC<IconProps>;
}

// Technology Interface
export interface Technology {
  name: string;
  icon: React.ReactElement;
}

// SEO Props Interface
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

// Theme Type
export type Theme = "light" | "dark";

// Theme Store Interface
export interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  initializeTheme: () => void;
}
