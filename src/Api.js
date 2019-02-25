//api.js
const baseUrl = 'http:127.0.0.1:8000'
export default {
    get : function (path) {
        return fetch(baseUrl + path).then(res => res.json())
      }
}