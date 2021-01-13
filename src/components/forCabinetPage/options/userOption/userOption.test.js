import React, { Fragment } from "react";
import UserOption from "./index.tsx";
import {render, fireEvent, screen, cleanup, wait} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";


describe('UserOption ', () => {
  test('render a title', () => {
    const {getByText} = render(
        <MemoryRouter>
          <UserOption />
        </MemoryRouter>
    );
    const text = screen.getByText(/дані/i)
    expect(text).toBeInTheDocument();
    expect(text.tagName).toMatch(/h4/i);

  });

  afterEach(cleanup);

  test('renders with blank fields', () => {
    const { container } = render(
        <MemoryRouter>
          <UserOption />
        </MemoryRouter>
    );

    const lastNameNode = container.querySelector('input[name="lastName"]');
    const firstNameNode = container.querySelector('input[name="firstName"]');
    const fathersNameNode = container.querySelector('input[name="fathersName"]');
    const emailNameNode = container.querySelector('input[name="email"]');
    const phonedNode = container.querySelector('input[name="phone"]');
    const schoolNode = container.querySelector('input[name="school"]');


    expect(lastNameNode.tagName).toBe('INPUT');
    expect(firstNameNode.tagName).toBe('INPUT');
    expect(fathersNameNode.tagName).toBe('INPUT');
    expect(emailNameNode.tagName).toBe('INPUT');
    expect(phonedNode.tagName).toBe('INPUT');
    expect(schoolNode.tagName).toBe('INPUT');
    expect(lastNameNode.getAttribute('value')).toBe('');
    expect(firstNameNode.getAttribute('value')).toBe('');
    expect(fathersNameNode.getAttribute('value')).toBe('');
    expect(emailNameNode.getAttribute('value')).toBe('');
    expect(phonedNode.getAttribute('value')).toBe('');
    expect(schoolNode.getAttribute('value')).toBe('');

  });

  test('Clicking the submit correct values after entering', async () => {
    const { container } = render(
        <MemoryRouter>
          <UserOption />
        </MemoryRouter>
    );

    const lastNameNode = container.querySelector('input[name="lastName"]');
    const firstNameNode = container.querySelector('input[name="firstName"]');
    const fathersNameNode = container.querySelector('input[name="fathersName"]');
    const emailNameNode = container.querySelector('input[name="email"]');
    const phonedNode = container.querySelector('input[name="phone"]');
    const schoolNode = container.querySelector('input[name="school"]');

    await wait(() => {
      fireEvent.change(lastNameNode, {
        target: {
          value: 'mockemail',
        },
      });
    });

    await wait(() => {
      fireEvent.change(firstNameNode, {
        target: {
          value: 'mockemail',
        },
      });
    });
    await wait(() => {
      fireEvent.change(lastNameNode, {
        target: {
          value: 'mockemail',
        },
      });
    });
    await wait(() => {
      fireEvent.change(fathersNameNode, {
        target: {
          value: 'mockemail',
        },
      });
    });
    await wait(() => {
      fireEvent.change(emailNameNode, {
        target: {
          value: 'mockemail',
        },
      });
    });
    await wait(() => {
      fireEvent.change(phonedNode, {
        target: {
          value: 'mockemail',
        },
      });
    });

    await wait(() => {
      fireEvent.change(schoolNode, {
        target: {
          value: 'mockemail',
        },
      });
    });

  });
});