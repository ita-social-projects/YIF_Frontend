import React, { Fragment } from "react";
import style from "./option1.module.scss";
import Option4UserMenu from "./index.tsx";
import { render, fireEvent, screen } from "@testing-library/react";

test("render the text", () => {
  const Text = () => (
    <p className={style.mainstyle}>Опція 4. Меню користувача</p>
  );
  render(<Text />);

  screen.getByText((content, node) => {
    const hasText = (node) => node.textContent === "Опція 4. Меню користувача";
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  });
});