import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Banner from '.';
import { wait } from '@testing-library/react';

describe('banner elements', () => {
  let banner;

  const textElements = [
    { tag: 'h1', text: 'Your IT Future' },
    // {
    //   tag: 'p',
    //   text:
    //     'Подбай про своє майбутнє вже сьогодні! Отримай ІТ освіту та роботу, не встаючи з-за шкільної парти! Обери свою ІТ – спеціальність у вищому навчальному закладі!',
    // },
    { tag: 'button', text: 'Почни вже' },
  ];

  beforeEach(() => {
    banner = render(<Banner />);
  });

  test.each(textElements)('should have %s element', (elem) => {
    //ensure the text is in the dom, will throw error if can't find
    const textElem = screen.getByText(elem.text);

    expect(textElem.tagName).toMatch(elem.tag.toUpperCase());
  });

  test('should have correct image', () => {
    const imageDom = screen.getByTestId(/image/i);

    //check the image location
    expect(imageDom).toHaveAttribute('src', '/assets/images/banner.svg');
  });
});

describe('banner events', () => {
  test('should change image position on mousemove once every 100ms', async () => {
    const { getByAltText } = render(<Banner />);
    const targetElem = getByAltText('img');
    jest.useFakeTimers();
    fireEvent.mouseMove(targetElem, { clientX: 10, clientY: 20 });
    fireEvent.mouseMove(targetElem, { clientX: 20, clientY: 40 });

    await wait(() => {
      expect(targetElem.style).toHaveProperty(
        'transform',
        'translate(-0.2px, -0.4px)'
      );
    });
  });

  test('should fire scroll event once button is clicked', async () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Banner handleClick={handleClick} />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
