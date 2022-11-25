import Categories from "../../components/categories/categories";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Categories />
      {children}
    </>
  );
}
