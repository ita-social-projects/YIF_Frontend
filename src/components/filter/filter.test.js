import React, { Fragment } from "react";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "../../store/store";
import Filter from "./filter";

let container = null;

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("ckeck filter page", () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Filter />
      </Provider>,
      container
    );
  });

  let button = container.querySelector("button");
  fireEvent.click(button);
  expect(mockHistoryPush).toHaveBeenCalledWith("/404");
});
