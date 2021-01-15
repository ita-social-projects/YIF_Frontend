import ReactDOM, {unmountComponentAtNode} from "react-dom";
import RegistrationPage from "./index";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../store/store";
import React from "react";


describe ('registrationPage', () => {

  test('checking to render wrapper', () => {

    let wrapper = null;
    beforeEach(() => {
      wrapper = document.createElement('section');
      document.body.appendChild(wrapper);
    });

    afterEach(() => {
      unmountComponentAtNode(wrapper);
      wrapper.remove();
      wrapper = null;
    });

  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
          <Provider store={store}>
            < RegistrationPage />
          </Provider>
        </MemoryRouter>,
        div
    );
  });

});
