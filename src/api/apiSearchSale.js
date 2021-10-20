import axios from "axios";
import { getToken} from "./apiGetToken"
export const searchSalesbyname = async (firstName ,lastName) => {
    const baseURL = process.env.REACT_APP_SEARCHSALEBYNAME_URL;
    const defaultOptions = {
        baseURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
        // "Access-Control-Allow-Origin":"*",
        },
    };

    const api = axios.create(defaultOptions);
    try {
        const inputPost = {
            "headerData":{
                "messageId": "3fe0a3c63603b7ea",
                "sentDateTime": "31-03-2020 13:47:01"
                },
            "requestRecord" :{
                "fileType" : "all",
                "firstName" : firstName,
                "lastName" : lastName ,
                "searchOldName" :"true",
                "parentStridBound" :"",
                "branchBound" :""
            }
         }
        const response = await api.post(`searchsalesbyname/search`,inputPost);
        if (response.status === 200) {
            return response;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        throw err;
    }
}


export const searchPersonset = async (queryType ,key) => {
    const baseURL = process.env.REACT_APP_SEARCHPERSONSET_URL;
    const defaultOptions = {
        baseURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
        // "Access-Control-Allow-Origin":"*",
        },
    };

    const api = axios.create(defaultOptions);
    try {
        const inputPost = {
            "headerData":{
                    "messageId": "3fe0a3c63603b7ea",
                    "sentDateTime": "31-03-2020 13:47:01"
                },
            "requestRecord" :{
                "fileType" : "all",
                "queryType" : queryType,
                "key" : key,
                "parentStridBound" :"",
                "branchBound" :""
            }
        }
        const response = await api.post(`searchpersonset/search`,inputPost);
        if (response.status === 200) {
            return response;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        throw err;
    }
}



export const searchLicenseNo = async (licenseNo ,agentType = "S") => {
    const baseURL = process.env.REACT_APP_SERVER_URL;
    const defaultOptions = {
        baseURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
        // "Access-Control-Allow-Origin":"*",
        },
    };

    const api = axios.create(defaultOptions);
    try {
        const response = await api.get(`agent/search?licenseNo=${licenseNo}&agentType=${agentType}`);
        if (response.status === 200) {
            return response;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        throw err;
    }
}





export const searchEmployeeInfo = async (queryType ,key) => {
    const baseURL = process.env.REACT_APP_EMPLOYEEINFO_URL;
    const token =  await getToken();
    console.log(token,"to")
    const defaultOptions =  {
        baseURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "Authorization" :  token && `${token.token_type} ${token.access_token}` 
        },
    };

    const api =  axios.create(defaultOptions);
    try {
        const inputPost = {
            "headerData":{
                "messageId": "3fe0a3c63603b7ea",
                "sentDateTime": "31-03-2020 13:47:01"
            },
            "requestRecord" :{
                "key" : key,
                "searchType" : queryType,
                "queryType": "I",
                "option": "T=A"
            }
        }
       const response = await api.post(`wsEmployeeInfo/rest/employeeinfo/searchEmployeeInfo/1.0`,inputPost);
        if (response.status === 200) {
            return response;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        throw err;
    }
}