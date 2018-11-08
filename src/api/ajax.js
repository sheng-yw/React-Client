import axios from 'axios';

const sendAjax = (url, data, type = 'GET') => {
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  let queryString = '';
  if (data) {

    // Object.keys(data).forEach(keys => {});
    for (let key in data) {
      queryString += key + '='+ data[key] + '&';
    }
    queryString = queryString.substr(0, queryString.length-1);
    url += '?' + queryString;
  }
  if (type.toUpperCase() === 'GET'){
    return axios.get(url);
  } else {
    // data = qs.stringify(data);
    return axios.post(url,queryString,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }});
  }
}

export default  sendAjax;