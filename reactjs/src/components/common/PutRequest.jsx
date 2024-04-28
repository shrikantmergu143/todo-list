import { App_url } from "./Constant";

export const PutRequestCallAPI = async (apiurl, payload, access_token) => {
    const headers = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `Bearer ${access_token}`
    }
    const getResponse = window.axios.put(`${App_url?.API_URL}${apiurl}`,payload,{
      headers:headers,
    }).then(function (result) {
      return result;
    }).catch((e)=>e.response);
    return getResponse;
};