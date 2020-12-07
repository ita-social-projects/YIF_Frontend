export const GET_DATA = 'GET_DATA';

interface GetData {
    type: typeof GET_DATA,
    payload: string[],
}

type getData_ = GetData;

export const getData=(payload:string[]):getData_=>{
    return{
        type:GET_DATA,
        payload:payload
    }
}