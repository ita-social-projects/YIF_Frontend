import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Banner from '.';
import { act } from 'react-dom/test-utils';

describe('banner elements', () => {
  let banner;

  const textElements = [
    { tag: 'h1', text: 'Your IT Future' },
    {
      tag: 'p',
      text:
        'Символіка риби містить багато різноманітних, іноді полярно протилежних значень. Існують легенди (записи яких збереглися в античних храмах), згідно з якими людська раса походить від cтворінь, які нагадують амфібій. Їхні тіла були вкриті лускою й дихали вони через зябра.',
    },
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
  test('should change image position on mousemove once every 100ms', () => {
    const { getByAltText } = render(<Banner />);
    const targetElem = getByAltText('img');

    act(() => {
      fireEvent.mouseMove(targetElem, { clientX: 10, clientY: 20 });
    });
    act(() => {
      fireEvent.mouseMove(targetElem, { clientX: 20, clientY: 40 });
    });

    expect(targetElem.style).toHaveProperty(
      'transform',
      'translate(-0.2px, -0.4px)'
    );
  });

  test('should fire scroll event once button is clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Banner handleClick={handleClick} />);
    const button = getByRole('button');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
