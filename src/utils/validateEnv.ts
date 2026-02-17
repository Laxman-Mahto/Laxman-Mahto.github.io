/**
 * Validates that required environment variables are set
 * Logs warnings to console if any are missing
 */

interface EnvConfig {
  // EmailJS credentials
  VITE_EMAILJS_SERVICE_ID?: string;
  VITE_EMAILJS_TEMPLATE_ID?: string;
  VITE_EMAILJS_PUBLIC_KEY?: string;

  // Site configuration
  VITE_SITE_URL?: string;

  // Social links (optional)
  VITE_GITHUB_URL?: string;
  VITE_LINKEDIN_URL?: string;
  VITE_TWITTER_URL?: string;
  VITE_DISCORD_URL?: string;
  VITE_INSTAGRAM_URL?: string;
}

const requiredEnvVars: Array<keyof EnvConfig> = [
  "VITE_EMAILJS_SERVICE_ID",
  "VITE_EMAILJS_TEMPLATE_ID",
  "VITE_EMAILJS_PUBLIC_KEY",
];

const optionalEnvVars: Array<keyof EnvConfig> = [
  "VITE_SITE_URL",
  "VITE_GITHUB_URL",
  "VITE_LINKEDIN_URL",
  "VITE_TWITTER_URL",
  "VITE_DISCORD_URL",
  "VITE_INSTAGRAM_URL",
];

export const validateEnvironmentVariables = (): void => {
  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  // Check required variables
  requiredEnvVars.forEach((key) => {
    if (!import.meta.env[key]) {
      missingRequired.push(key);
    }
  });

  // Check optional variables
  optionalEnvVars.forEach((key) => {
    if (!import.meta.env[key]) {
      missingOptional.push(key);
    }
  });

  // Log results
  if (missingRequired.length > 0) {
    console.error(
      "❌ Missing REQUIRED environment variables:",
      missingRequired.join(", ")
    );
    console.error(
      "⚠️  Contact form will NOT work without EmailJS credentials!"
    );
    console.error(
      "💡 Create a .env file and add:\n" +
        missingRequired.map((key) => `${key}=your_value_here`).join("\n")
    );
  } else {
    console.log("✅ All required environment variables are set");
  }

  if (missingOptional.length > 0 && import.meta.env.DEV) {
    console.warn(
      "⚠️  Missing optional environment variables:",
      missingOptional.join(", ")
    );
    console.warn("💡 These will use fallback values from constants.ts");
  }

  // Show summary in development
  if (import.meta.env.DEV) {
    console.log("🔧 Environment Configuration:");
    console.table({
      "EmailJS Service": import.meta.env.VITE_EMAILJS_SERVICE_ID ? "✓" : "✗",
      "EmailJS Template": import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? "✓" : "✗",
      "EmailJS Public Key": import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? "✓" : "✗",
      "Site URL": import.meta.env.VITE_SITE_URL || "Using fallback",
    });
  }
};

/**
 * Gets environment variable with type safety
 * Returns undefined if not set
 */
export const getEnv = (key: keyof EnvConfig): string | undefined => {
  return import.meta.env[key];
};

/**
 * Checks if EmailJS is properly configured
 */
export const isEmailJSConfigured = (): boolean => {
  return !!(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
