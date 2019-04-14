// import store from '@/store';
// import log from './logger';

export default async (router = '', data = {}, method = 'GET', type = 'json') => {
  console.log(new Date());
  console.log('data:', data);
  const reqMethod = method.toUpperCase();
  const reqUrl = router;
  const requestConfig = {
    method: reqMethod,
  };
  if (type === 'json') {
    requestConfig['Content-Type'] = 'application/json';

    if (method === 'POST') {
      requestConfig.body = JSON.stringify(data);
    }
  }

  if (type === 'form-data') {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    requestConfig.body = formData;
  }
  console.log('requestConfig:', requestConfig);

  try {
    console.log('before fetch');
    // without "var", response is undefined outsie of this block
    var response = await fetch(reqUrl, requestConfig);
    console.log('success response:', response);

  } catch (err) {
    // explicitly log error, otherwise error won't show() in console
    console.log('error response:', err);

    return new Promise((resolve, reject) => {
      reject(err)
    });
  }

  try {
    // response.json() return promise, use await to get result
    // can not call response.json() twice because response.body can only be read once
    // response must be json format, otherwise error will be thrown
    let responseJson = await response.json();
    console.log('responseJson:', responseJson);

    return new Promise(
      (resolve, reject) => {
        if (!response.ok) {
            reject(responseJson)
        } else {
            resolve(responseJson)
        }
      }
    );

  } catch(err) {
    // explicitly log error, otherwise error won't show() in console
    console.log('error:', err);

    return new Promise(
      (resolve, reject) => {
        reject(err)
      }
    );
  }

};
