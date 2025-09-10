import type { Config } from "tailwindcss"
const config: Partial<Config> = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "16px" },
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          dark: "var(--brand-dark)",
          text: "var(--brand-text)"
        }
      },
      fontFamily: { sans: ["var(--font-sans)"] }
    }
  }
}
export default config
