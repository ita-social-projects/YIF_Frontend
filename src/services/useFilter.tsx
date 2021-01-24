import { useState,useEffect } from 'react';
import { requestData } from '../services/requestDataFunction';
import { setUniversity,setSpeciality, setDirection} from '../store/reducers/dropboxReducer';
import dropboxReducer from '../store/reducers/dropboxReducer';
import { useDispatch, useSelector } from 'react-redux';

export const useGetAllListData =(endpoint: string,action:string) =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        requestData(endpoint,'GET')
        .then((res:any)=>{
            //store data to state
            let names:string[]=res.data;
            switch(action){
                case 'setUniversity':{
                    dispatch(setUniversity(names));
                }
                break;
                case 'setSpeciality':{
                    dispatch(setSpeciality(names));
                }
                break;
                case 'setDirection':{
                    dispatch(setDirection(names));
                }
                break;
            }
        })
        .catch((err:any)=>{
            console.log(err);
        })
    },[])

    return ()=>{
        //let answer:string='succes';
        //dispatch({type:'SET_DATA',mass1});
        //dispatch(SET_DATA(mass1)); 
    };
}


