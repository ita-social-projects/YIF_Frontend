const parseURL = (url: string) => {
  let urlParam: any = {};
  url
    .substring(1)
    .split('&')
    .forEach((item) => {
      let param = item.split('=');
      urlParam[param[0]] = param[1];
    });
  return urlParam;
};

export default parseURL;
