import Container from "../layout/Container";
import Logo from "./Logo";
import Nav from "./Nav";

const Navbar = () => {
  return (
    <header>
      <Container>
        <Logo />
        <Nav />
      </Container>
    </header>
  );
};

export default Navbar;
