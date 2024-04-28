import { App_url } from "./Constant";

export const DeleteRequest = async (apiurl, payload, access_token) => {
    const headers = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `Bearer ${access_token}`
    }
    const getResponse = window.axios.delete(`${App_url?.API_URL}${apiurl}`,{
      data: payload, // Pass payload as data
    },{
      headers:headers,
    }).then(function (result) {
      return result;
    }).catch((e)=>e.response);
    return getResponse;
};