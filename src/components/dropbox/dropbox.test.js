import React,{Fragment} from 'react'
import { render} from '@testing-library/react';
import {unmountComponentAtNode} from "react-dom"
import { act } from "react-dom/test-utils";

import Dropbox from './dropbox';

let container = null;

let university=['u1','u2','u3','u4'];
let direction=['d1','d2','d3','d4'];
let speciality=['s1','s2','s3','s4'];

const resetFilter =()=>{
    const selectors = document.querySelectorAll('select');
    for(let a = 0;a<3;a++){
        selectors[a].selectedIndex=0;
        for(let b = 0; b<5;b++){
            selectors[a].options[b].hidden=false;
        }
    }
    
  }
  
  const filter1 =()=>{
    const selectors = document.querySelectorAll('select');
    if(selectors[0].selectedIndex===1){
        selectors[1].options[2].hidden=true
        selectors[1].options[3].hidden=true
        selectors[1].selectedIndex=1;
  
        selectors[2].options[1].hidden=true
        selectors[2].options[2].hidden=true
        selectors[2].selectedIndex=1;
    }else
    if((selectors[0].selectedIndex===0)||(selectors[1].selectedIndex===0)||(selectors[2].selectedIndex===0)){
      for(let a = 0;a<3;a++){
        selectors[a].selectedIndex=0;
        for(let b = 0; b<5;b++){
            selectors[a].options[b].hidden=false;
        }
    }
    }
  }



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
        render(<Dropbox 
            university={university} 
            direction={direction}
            speciality={speciality}
            filter1={filter1}
            resetFilter={resetFilter}
        />,container);
    });
    expect(container.textContent).toBe("");

});
