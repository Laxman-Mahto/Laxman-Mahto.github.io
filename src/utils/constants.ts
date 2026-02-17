// Time intervals
export const CLOCK_UPDATE_INTERVAL = 1000; // 1 second in milliseconds

export const SOCIAL_LINKS = {
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com/Laxman-Mahto",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/laxman-mahto-496040319/",
  twitter: import.meta.env.VITE_TWITTER_URL || "https://x.com/ilaxmanmahto",
  discord: import.meta.env.VITE_DISCORD_URL || "https://discord.com/users/aaluu_26",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/daksh.sangwan?igs+fhdfh",
} as const;

export const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

// Location
export const LOCATION = "New Delhi, India";