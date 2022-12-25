import styles from "./header.module.css";
import Logo from "./logo/logo";
import Search from "./search/search";
import ToggleTheme from "./toggleTheme/toggleTheme";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Search />
      <ToggleTheme />
    </header>
  );
}
