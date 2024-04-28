import { App_url } from "./Constant"

// GetRequestAPI
export const GetRequestAPI = async (apiurl, access_token, data) => {
    const headers = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `Bearer ${access_token}`
    }
    const header = {
      headers:headers,
    }
    if(data){
      header.params = data
    }
    const getResponse = window.axios.get(`${App_url?.API_URL}${apiurl}`, header).then(function (result) {
    return result;
    }).catch((e)=>e.response)
    return getResponse;
}