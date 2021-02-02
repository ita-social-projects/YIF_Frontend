import React,{useState} from 'react';
import { render, fireEvent } from '@testing-library/react';
import {useGetAllListData} from './useFilter';
import { APIUrl } from './endpoints';
import { Fragment } from 'react';
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useSelector,useDispatch } from 'react-redux';
import { selectData,selectChosenData ,chooseDirection, chooseSpeciality, chooseUniversity} from '../store/reducers/dropboxReducer';
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import ReactDOM from "react-dom";

const mockJsonPromise = Promise.resolve(['data1','data2','data3']);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('useFilter Hook',()=>{
    const TestComponent = ()=>{

        const [isFetching, setFetching] = useState(false);

        useGetAllListData(`${APIUrl}University/Abbreviations`,'setUniversity');
        useGetAllListData(`${APIUrl}Specialty/Names`,'setSpeciality');
        useGetAllListData(`${APIUrl}Direction/Names`,'setDirection');

        const state = useSelector(selectData);
        let university: string[] = state.university;
        let direction: string[] = state.direction;
        let speciality: string[] = state.speciality;
        return(
            <Fragment>
                <div>
                    Success!
                    <div>{speciality}</div>
                    <div>{direction}</div>
                    <div>{university}</div>
                </div>
            </Fragment>
        )
    };

    let container:any= null;

    beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    });

    afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    });

    test('hook used successfuly', () => {
       act(() => {
            ReactDOM.render(
                <Provider store={store}>
                    <TestComponent  />
                </Provider>,
                container
                );
            });

        let divs = container.querySelectorAll('div');
        console.log('divs',divs[0].innerHTML);
        expect(divs[1].innerHTML).toBe('Спеціальність 1');
        expect(divs[2].innerHTML).toBe('Напрям 1');
        expect(divs[3].innerHTML).toBe('Університет 1');
        expect(global.fetch).toHaveBeenCalledTimes(3);
      });


})