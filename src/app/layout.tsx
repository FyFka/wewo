import Header from "../components/header/header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main id="root-layout">{children}</main>
      </body>
    </html>
  );
}
