import { cookies } from "next/headers";
import Header from "../components/header/header";
import "./globals.css";

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
