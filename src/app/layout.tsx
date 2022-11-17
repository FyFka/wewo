import Container from "../components/container/container";
import Header from "../components/header/header";
import Categories from "../components/categories/categories";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <Container>
          <Categories />
          {children}
        </Container>
      </body>
    </html>
  );
}
