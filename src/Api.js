//api.js
const baseUrl = 'http://127.0.0.1:8000'
const jsonToQueryString =  function (json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  }).join('&');
}
export default {
  get: function (path, cb) {
    var headers = new Headers();
    var status = 200
    fetch(baseUrl + path, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      redirect: 'manual',
      headers: headers
    }).then((response) => {
      status = response.status
      return response.json()

    }).then((resJson) => {
      cb(status == 200, resJson, status);
    }).catch((e) => {
      cb(false, e, status);
    });
  },
  post: (url, formData, cb) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    for (let k in formData) {
      if(formData[k]=='null' || formData[k]==null)
        delete formData[k]
    }
    let status = 200
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: jsonToQueryString(formData)
    }).then((response) => {
      status = response.status
      return response.json()
    }).then((resJson) => {
      console.log('response', resJson);
      cb(true, resJson,status);
    }).catch((e) => {
      cb(false, {error: e},status);
    });
  }
}