import axios from "axios";

const env = process.env.REACT_APP_ENV ;
const baseURL = process.env.REACT_APP_SERVER_URL;
//const baseURL = "http://localhost:8080/licenseexam/";
//const baseURL = "https://dev-smws.thailife.com:8443/wsLicenseAgentSpring/licenseexam";

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
export default api;