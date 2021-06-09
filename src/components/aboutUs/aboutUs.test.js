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
      Ми надаємо можливість абітурієнтам ознайомитись із переліком навчальних
      закладів, які надають освіту в нашому регіоні. Також Ви можете отримати
      детальну інформацію про наявні спеціальності та детальну інформацію,
      необхідну для вступу до університету.
    </p>
  );
  render(<Desc />);

  screen.getByText((content, node) => {
    const hasText = (node) =>
      node.textContent ===
      'Ми надаємо можливість абітурієнтам ознайомитись із переліком навчальних закладів, які надають освіту в нашому регіоні. Також Ви можете отримати детальну інформацію про наявні спеціальності та детальну інформацію, необхідну для вступу до університету.';
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  });
});
