import React from "react";
import { fireEvent } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import UserWorkSpace from "./index";
import UserOption from "../options/userOption/index";
import UnivListOption from "../options/univListOption/index";
import SpecListOption from "../options/specListOption/index";

let container = null;
let container_option = null;

beforeEach(() => {
  container = document.createElement("div");
  container_option = document.createElement("div");
  document.body.appendChild(container);
  document.body.appendChild(container_option);
});

afterEach(() => {
  unmountComponentAtNode(container);
  unmountComponentAtNode(container_option);
  container.remove();
  container_option.remove();
  container = null;
  container_option = null;
});

it("renders list of options", () => {
  act(() => {
    ReactDOM.render(<UserWorkSpace />, container);
  });

  let menuList = container.querySelectorAll("li");
  expect(menuList[0].textContent).toBe(`Меню${"\u00a0"}користувача`);
  expect(menuList[1].textContent).toBe("Університети");
  expect(menuList[2].textContent).toBe("Спеціальності");
});

it("look if after click on menu option or icon we render right component", () => {
  act(() => {
    ReactDOM.render(<UserWorkSpace />, container);
  });

  let menuList = container.querySelectorAll("li");
  let mainFiled = container.querySelectorAll("article");
  let icons = mainFiled[0].querySelectorAll("div");
  //-------- choose user Menu -----------
  //--- click on menu option
  fireEvent.click(menuList[0]);
  act(() => {
    ReactDOM.render(<UserOption />, container_option);
  });
  expect(mainFiled[3].textContent).toBe(container_option.textContent);
  //--- click on icon
  fireEvent.click(icons[0]);
  act(() => {
    ReactDOM.render(<UserOption />, container_option);
  });
  expect(mainFiled[3].textContent).toBe(container_option.textContent);

  //-------- choose univ List -----------
  //--- click on menu option
  fireEvent.click(menuList[1]);
  act(() => {
    ReactDOM.render(<UnivListOption />, container_option);
  });
  expect(mainFiled[3].textContent).toBe(container_option.textContent);
  //--- click on icon
  fireEvent.click(icons[1]);
  act(() => {
    ReactDOM.render(<UnivListOption />, container_option);
  });
  expect(mainFiled[3].textContent).toBe(container_option.textContent);

  //-------- choose spec List -----------
  //--- click on menu option
  fireEvent.click(menuList[2]);
  act(() => {
    ReactDOM.render(<SpecListOption />, container_option);
  });
  expect(mainFiled[3].textContent).toBe(container_option.textContent);
  //--- click on icon
  fireEvent.click(icons[2]);
  act(() => {
    ReactDOM.render(<SpecListOption />, container_option);
  });
  expect(mainFiled[3].textContent).toBe(container_option.textContent);
});

it("check if menu os open/close on hover effect", () => {
  act(() => {
    ReactDOM.render(<UserWorkSpace />, container);
  });

  let navBar = container.querySelector("article");
  let mainFiled = container.querySelectorAll("article");
  //console.log(NavBar);
  //--- hover mouse on NavBar -------
  fireEvent.mouseOver(navBar);
  expect(mainFiled[1].classList.contains("mainMenuWidth")).toBe(true);
  //--- remove mouse from main section
  fireEvent.mouseOver(mainFiled[3]);
  expect(mainFiled[1].classList.contains("mainMenuWidth")).toBe(false);
});
