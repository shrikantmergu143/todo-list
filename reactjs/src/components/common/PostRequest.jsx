import { App_url } from "./Constant";

export const PostRequestCallAPI = async (apiurl, payload, access_token) => {
    const headers = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `Bearer ${access_token}`
    }
    const getResponse = window.axios.post(`${App_url?.API_URL}${apiurl}`,payload,{
      headers:headers,
    }).then(function (result) {
      return result;
    }).catch((e)=>e.response);
    return getResponse;
};