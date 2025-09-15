// app/layout.tsx
import "./globals.css"; // varsa global css'in
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karen Group",
  description: "Karen Group web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
