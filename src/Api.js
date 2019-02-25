//api.js
const baseUrl = 'http://127.0.0.1:8000'
export default {
    get : function (path,cb) {
      var headers = new Headers();
      var status = 200
      fetch(baseUrl+path, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        redirect: 'manual',
        headers: headers
      }).then((response) => {
        status = response.status
        return response.json()
        
      }).then((resJson) => {
        cb(status==200, resJson,status);
      }).catch((e) => {
        cb(false, e,status);
      });
      }
}