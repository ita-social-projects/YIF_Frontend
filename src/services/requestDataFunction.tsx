// To import this function(promise) -> import {RequestData} from [path]
//------------------------------------------------------------
// To use this function(promise)
//
// RequestData(URL,method,[data(if method is not GET)])
//.then((res:type)=>{
//    console.log(res)
//  })
//  .catch((err:type)=>{
//    console.log(err)
//  })
//
// where data is an object with multiple fields
// data={
//    'field1':'value1'
//    'filed2':'value2'
//}

type Respone<T extends object> = {
  statusCode: number;
  data: T;
};

export async function requestData<TData extends object>(
  url: string,
  method: string,
  body?: any
): Promise<Respone<TData>> {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const statusCode = res.status;
  const parseBody = await res.json();

  return {
    statusCode,
    data: parseBody as TData,
  };
}

// REQUEST FOR CHANGE IMAGE PROFILE:
type ResponeProfileImage<T extends object> = {
  statusCode: number;
  data: T;
};

export async function requestImageProfile<TData extends object>(
  url: string,
  method: string,
  body?: any
): Promise<ResponeProfileImage<TData>> {
  const appJWTToken = localStorage.getItem('token');

  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${appJWTToken}`,
    },
    body: JSON.stringify(body),
  });
  const statusCode = res.status;
  const parseBody = await res.json();
  return {
    statusCode,
    data: parseBody as TData,
  };
}

export async function requestSecureData<TData extends object>(
  url: string,
  method: string,
  token: string,
  body?: any
): Promise<Respone<TData>> {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const statusCode = res.status;
  const parseBody = await res.json();

  return {
    statusCode,
    data: parseBody as TData,
  };
}
