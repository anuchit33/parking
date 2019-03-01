//api.js
const baseUrl = 'http://127.0.0.1:8000'
const jsonToQueryString =  function (json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  }).join('&');
}
export default {
  get: async function (path) {
    var headers = new Headers();

    const response = await fetch(baseUrl + path, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      redirect: 'manual',
      headers: headers
    })    
    const data = await response.json()
    return {
        data: data,
        status_code: response.status
    }
  },
  post: async (path, formData) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    for (let k in formData) {
      if(formData[k]=='null' || formData[k]==null)
        delete formData[k]
    }
    let status = 200
    const response =  await  fetch(baseUrl + path, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: jsonToQueryString(formData)
    })
    const data = await response.json()
    return {
        data: data,
        status_code: response.status
    }
  }
}