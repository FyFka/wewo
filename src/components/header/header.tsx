import Logo from "./logo/logo";
import Search from "./search/search";
import SignIn from "./signIn/signIn";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Search />
      <SignIn />
    </header>
  );
}
