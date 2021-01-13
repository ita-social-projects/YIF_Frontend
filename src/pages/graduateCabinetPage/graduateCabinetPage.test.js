import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import UserCabinet from "./index";

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

it("Check graduateUserCabinet page", () => {
 
    act(() => {
      ReactDOM.render(
      <MemoryRouter>
      <UserCabinet />
      </MemoryRouter>, container);
    });

});
