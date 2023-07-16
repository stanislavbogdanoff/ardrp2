import { ReactNode } from "react";
import styles from "./Layout.module.scss";
import Container from "./Container";
import Wrapper from "./Wrapper";

type SectionProps = {
  ver?: boolean;
  children?: ReactNode;
};

const Section = ({ ver, children }: SectionProps) => {
  return (
    <section className={styles.layout_section}>
      <Container>
        <Wrapper ver={ver}>{children}</Wrapper>
      </Container>
    </section>
  );
};

export default Section;
