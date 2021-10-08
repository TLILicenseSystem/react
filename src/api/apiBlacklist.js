import axios from "axios";

export const searchBlacklist = async (queryType ,key) => {
    const baseURL = process.env.REACT_APP_SEARCHBLACKLIST_URL;
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
                "queryType" : queryType,
                "key" :key
            }
        }
        const response = await api.post(`searchblacklist/search`,inputPost);
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
