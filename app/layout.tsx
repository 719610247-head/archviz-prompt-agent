import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArchViz Prompt Agent MVP",
  description: "Local mock interface for architecture visualization prompt optimization"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
