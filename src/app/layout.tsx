"use client";
import { ThemeProvider } from "next-themes";
import Header from "../components/header/header";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }}>
      <head />
      <body>
        <ThemeProvider defaultTheme="dark">
          <Header />
          <main id="root-layout">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
