import React from 'react';
import AboutUs from '.';
import styles from './aboutUs.module.scss';
import { render, screen } from '@testing-library/react';

test('render a title', () => {
  const { getByText } = render(<AboutUs />);
  expect(getByText(/Про нас/i)).toBeInTheDocument();
  const title = screen.getByText(/Про нас/i);
  expect(title).toBeInTheDocument();
  expect(title.tagName).toMatch(/H2/i);
});

test('render a description', () => {
  const Desc = () => (
    <p className={styles.aboutUs__desc}>
      Існують легенди (записи яких збереглися в античних храмах), згідно з якими
      людська раса походить від cтворінь, які нагадують амфібій. Їхні тіла були
      вкриті лускою й дихали вони через зябра.У низці міфів риби виконують
      функцію деміурга, тобто беруть участь у створенні світу: наприклад, риба
      приносить із дна першоствореного океану мул, з якого створюється суходіл.
    </p>
  );
  render(<Desc />);

  screen.getByText((content, node) => {
    const hasText = (node) =>
      node.textContent ===
      'Існують легенди (записи яких збереглися в античних храмах), згідно з якими людська раса походить від cтворінь, які нагадують амфібій. Їхні тіла були вкриті лускою й дихали вони через зябра.У низці міфів риби виконують функцію деміурга, тобто беруть участь у створенні світу: наприклад, риба приносить із дна першоствореного океану мул, з якого створюється суходіл.';
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  });
});
