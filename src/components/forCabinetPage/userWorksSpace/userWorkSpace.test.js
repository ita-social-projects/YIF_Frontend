import React,{Fragment} from 'react'
import { render} from '@testing-library/react';
import {unmountComponentAtNode} from "react-dom"
import { act } from "react-dom/test-utils";
import ReactDOM from 'react-dom'
import UserWorkSpace from './index'

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

it("renders list of options",() =>{
    act(()=>{
        ReactDOM.render(
            <UserWorkSpace />,container);
    });
    const ul = document.querySelectorAll('ul');
    const liMainList = ul[0].querySelectorAll('li');
    const liUserList = ul[1].querySelectorAll('li');
    let i = 1;

    liMainList.forEach((li)=>{
        expect(li.textContent).toBe(`Опція ${i} (головне меню)`);
        i++;
    })

    i=1;

    liUserList.forEach((li)=>{
        expect(li.textContent).toBe(`Опція ${i} (меню користувача)`);
        i++;
    })
    
});
