import { rejects } from "assert";

// To import this function(promise) -> import {RequestData} from [path]
//------------------------------------------------------------
// To use this function(promise)
//
// RequestData(URL,method,[data(if method is not GET)])
//.then((res)=>{
//    console.log(res)
//  })
//  .catch((err)=>{
//    console.log(err)
//  })
//
// where data is an object with multiple fields
// data={
//    'field1':'value1'
//    'filed2':'value2'
//}

type Response = { //declaration of type
  data: object; 
  statusCode: number;
};
/*
let result: Response = { // initialization of object -> result type Response
  data: {}, 
  statusCode: 0,
};
*/
export const RequestData = (link: string, method: string, data?: object) => {
  let result: Response = { // initialization of object -> result type Response
    data: {}, 
    statusCode: 0,
  };
  return new Promise((resolve, rejects) => {
    fetch(link, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        result.statusCode = res.status;
        return res.json();
      })
      .then((data) => {
        result.data = data;
        resolve(result);
        //Promise.resolve(result);
      })
      .catch((err) => {
        //rejects(err);
        Promise.reject(err);
      });
  });
};
