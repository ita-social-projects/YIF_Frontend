import React,{Fragment} from 'react'
import { render} from '@testing-library/react';
import {unmountComponentAtNode} from "react-dom"
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';

import { store } from '../../store/store';
import Dropbox from './dropbox';

let container = null;

beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

it("renders with or without a name",() =>{
    act(()=>{
        render(
            <Provider store={store}><Dropbox /></Provider>,container);
    });
    expect(container.textContent).toBe("");

});
