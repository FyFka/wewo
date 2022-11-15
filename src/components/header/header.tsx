import Logo from "./logo/logo";
import Search from "./search/search";
import styles from "./header.module.css";
import SignIn from "./signIn/signIn";

interface IHeaderProps {
  disabled?: boolean;
}

export default function Header({ disabled }: IHeaderProps) {
  return (
    <header className={styles.header}>
      <Logo />
      <Search disabled={disabled} />
      <SignIn />
    </header>
  );
}
