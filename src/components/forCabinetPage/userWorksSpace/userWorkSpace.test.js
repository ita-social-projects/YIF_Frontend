import React, { Fragment } from "react";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import UserWorkSpace from "./index";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders list of options", () => {
  act(() => {
    ReactDOM.render(<UserWorkSpace />, container);
  });

  


});
