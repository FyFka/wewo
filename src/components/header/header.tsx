import Logo from "./logo/logo";
import Search from "./search/search";
import styles from "./header.module.css";
import SignIn from "./signIn/signIn";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Search />
      <SignIn />
    </header>
  );
}
