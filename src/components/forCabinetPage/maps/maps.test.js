import React,{Fragment} from 'react'
import style from './option1.module.scss'
import UniversityMaps from './index.tsx'
import { render, fireEvent, screen } from '@testing-library/react';

test('render the text', () => {
    const Text = () => (
      <p className={style.mainstyle}>
        Карти університетів
      </p>
    );
    render(<Text />);
  
    screen.getByText((content, node) => {
      const hasText = (node) =>
        node.textContent ===
        'Карти університетів';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });
  });