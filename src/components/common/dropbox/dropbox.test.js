import React, { Fragment } from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import DropboxElement from "./dropbox";

import { Provider } from "react-redux";

import { store } from "../../../store/store";

const mockJsonPromise = Promise.resolve(['dataFromBase1','dataFromBase2','dataFromBase3','dataFromBase4']);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

let container= null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Check dropbox component - Direction", () => {
  act(() => {
    ReactDOM.render(
      <>
      <Provider store={store}>
        <DropboxElement
          data={['data','data1','data2']}
          keyId={0}
          listName={"listName"}
          listTitle={"Direction"}
          placeholder={'напрям'}
          reduxMethod={'chooseDirection'}
        />
        <DropboxElement
          data={['data','data1','data2']}
          keyId={1}
          listName={"listName1"}
          width={21.75}
          listTitle={"Speciality"}
          placeholder={'спеціальність'}
          reduxMethod={'chooseSpeciality'}
        />
        <DropboxElement
          data={['data','data1','data2']}
          keyId={2}
          listName={'listName2'}
          width={21.75}
          listTitle={"University"}
          placeholder={'університет'}
          reduxMethod={'chooseUniversity'}
        />
        </Provider>
      </>,
      container
    );
  });
  // 0...3 - directions
  // 4...7 - spesiality
  // 8...11 - university
  let divs = container.querySelectorAll("div");
  
  let listTitleDirection = divs[3].querySelector("li");
  let listTitleSpeciality = divs[3+4].querySelector("li");
  let listTitleUniversity = divs[3+4+4].querySelector("li");
  
  let arrowDirection = divs[2];
  let arrowSpeciality = divs[2+4];
  let arrowUniversity = divs[2+4+4];

  let inputDirection = divs[1].querySelector("input");
  let inputSpeciality = divs[1+4].querySelector("input");
  let inputUniversity = divs[1+4+4].querySelector("input");

  let divListBoxDirection = divs[3];
  let divListBoxSpeciality = divs[3+4];
  let divListBoxUniversity = divs[3+4+4];

  let liListBoxDirection = divs[3].querySelectorAll('ul li');
  let liListBoxSpeciality = divs[3+4].querySelectorAll('ul li');
  let liListBoxUniversity = divs[3+4+4].querySelectorAll('ul li');
 
  //====== Check Direction dropbox ============
  //-- open dropbox
  fireEvent.click(inputDirection);
  expect(divListBoxDirection.classList.contains("show_list_box")).toBe(true);
  expect(inputDirection.classList.contains("gray_color_text")).toBe(true);
  expect(arrowDirection.classList.contains("arrow_up")).toBe(true);
  
  //--choose option listTitle
  fireEvent.click(listTitleDirection);
  expect(global.fetch).toHaveBeenCalledTimes(1);

  //-- check state of objects again
  divs = container.querySelectorAll("div");

  listTitleDirection = divs[3].querySelector("li");
  arrowDirection = divs[2];
  inputDirection = divs[1].querySelector("input");
  divListBoxDirection = divs[3];

  //-- close dropbox
  expect(divListBoxDirection.classList.contains("show_list_box")).toBe(false);
  expect(inputDirection.classList.contains("gray_color_text")).toBe(false);
  expect(arrowDirection.classList.contains("arrow_up")).toBe(false);
  //-- check the value of input
  expect(inputDirection.value).toBe("Direction");

  // -- check the pick proccess of other options
  fireEvent.click(liListBoxDirection[1]);
  inputDirection = divs[1].querySelector("input");
  expect(inputDirection.value).toBe("data");
  expect(global.fetch).toHaveBeenCalledTimes(3);
  //====================================================


  //============= Check Speciality dropbox =============
  //-- open dropbox
  fireEvent.click(inputSpeciality);
  expect(divListBoxSpeciality.classList.contains("show_list_box")).toBe(true);
  expect(inputSpeciality.classList.contains("gray_color_text")).toBe(true);
  expect(arrowSpeciality.classList.contains("arrow_up")).toBe(true);
  
  //--choose option listTitle
  fireEvent.click(listTitleSpeciality);
  expect(global.fetch).toHaveBeenCalledTimes(4);

  //-- check state of objects again
  divs = container.querySelectorAll("div");

  listTitleSpeciality = divs[3+4].querySelector("li");
  arrowSpeciality = divs[2+4];
  inputSpeciality = divs[1+4].querySelector("input");
  divListBoxSpeciality = divs[3+4];

  //-- close dropbox
  expect(divListBoxSpeciality.classList.contains("show_list_box")).toBe(false);
  expect(inputSpeciality.classList.contains("gray_color_text")).toBe(false);
  expect(arrowSpeciality.classList.contains("arrow_up")).toBe(false);
  //-- check the value of input
  expect(inputSpeciality.value).toBe("Speciality");

  // -- check the pick proccess of other options
  fireEvent.click(liListBoxSpeciality[1]);
  inputSpeciality = divs[1].querySelector("input");
  expect(inputSpeciality.value).toBe("data");
  expect(global.fetch).toHaveBeenCalledTimes(6);
  //==================================================

  //=============== Check University dropbox =========
  //-- open dropbox
  fireEvent.click(inputUniversity);
  expect(divListBoxUniversity.classList.contains("show_list_box")).toBe(true);
  expect(inputUniversity.classList.contains("gray_color_text")).toBe(true);
  expect(arrowUniversity.classList.contains("arrow_up")).toBe(true);
  
  //--choose option listTitle
  fireEvent.click(listTitleUniversity);
  expect(global.fetch).toHaveBeenCalledTimes(7);

  //-- check state of objects again
  divs = container.querySelectorAll("div");

  listTitleUniversity = divs[3+4+4].querySelector("li");
  arrowUniversity = divs[2+4+4];
  inputUniversity = divs[1+4+4].querySelector("input");
  divListBoxUniversity = divs[3+4+4];

  //-- close dropbox
  expect(divListBoxUniversity.classList.contains("show_list_box")).toBe(false);
  expect(inputUniversity.classList.contains("gray_color_text")).toBe(false);
  expect(arrowUniversity.classList.contains("arrow_up")).toBe(false);
  //-- check the value of input
  expect(inputUniversity.value).toBe("University");
  
  // -- check the pick proccess of other options
  fireEvent.click(liListBoxUniversity[1]);
  inputUniversity = divs[1].querySelector("input");
  expect(inputUniversity.value).toBe("data");
  expect(global.fetch).toHaveBeenCalledTimes(9);
  //=================================================

});

