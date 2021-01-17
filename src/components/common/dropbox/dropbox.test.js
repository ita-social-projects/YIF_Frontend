import React, { Fragment } from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import DropboxElement from "./dropbox";

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

it("Check dropbox component", () => {
  act(() => {
    ReactDOM.render(
      <>
        <DropboxElement
          data={"data"}
          keyId={0}
          listName={"listName"}
          listTitle={"listTitle"}
        />
        <DropboxElement
          data={"data"}
          keyId={1}
          listName={"listName1"}
          width={21.75}
          listTitle={"listTitle1"}
        />
      </>,
      container
    );
  });

  let divs = container.querySelectorAll("div");
  let listTitle = divs[3].querySelector("li");
  let arrow = divs[2];
  let input = divs[1].querySelector("input");
  let listBox = divs[3];

  //---- check if our dropbox is working
  //-- open dropbox
  fireEvent.click(input);
  expect(listBox.classList.contains("show_list_box")).toBe(true);
  expect(input.classList.contains("gray_color_text")).toBe(true);
  expect(arrow.classList.contains("arrow_up")).toBe(true);
  //--choose option
  fireEvent.click(listTitle);

  //-- check state of objects again
  divs = container.querySelectorAll("div");
  arrow = divs[2];
  input = divs[1].querySelector("input");
  listBox = divs[3];
  //-- close dropbox
  expect(listBox.classList.contains("show_list_box")).toBe(false);
  expect(input.classList.contains("gray_color_text")).toBe(false);
  expect(arrow.classList.contains("arrow_up")).toBe(false);
  //-- check the value of input
  expect(input.value).toBe("listTitle");
});
