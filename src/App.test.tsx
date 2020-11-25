import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { Counter } from "./components/counter/Counter";

test("fake test", () => {
  expect(true).toBeTruthy();
});

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/Toolkit/i)).toBeInTheDocument();
});
