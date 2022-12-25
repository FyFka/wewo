import "./globals.css";
import { cookies } from "next/headers";
import Header from "../components/header/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("theme")?.value || "dark";

  return (
    <html lang="en" data-theme={theme} style={{ colorScheme: theme }}>
      <head />
      <body>
        <Header />
        <main id="root-layout">{children}</main>
      </body>
    </html>
  );
}
