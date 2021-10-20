import axios from "axios";
import qs from "qs";

export const getToken = async () => {
    const baseURL = process.env.REACT_APP_EMPLOYEEINFO_URL + "/token";
    const defaultOptions = {
        baseURL,
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin':'*',
            'content-type': 'application/json'        
        },
        data:qs.stringify( {
          grant_type: 'client_credentials',
          client_id: process.env.REACT_APP_CONSUMER_KEY,
          client_secret: process.env.REACT_APP_CONSUMER_SECRET
        })
    };


    
    axios.request(defaultOptions).then(function (response) {
        console.log(response)
    }).catch(function (error) {
        console.error(error);
    });


}