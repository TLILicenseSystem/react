import axios from "axios";

//const baseURL = "http://localhost:8080/wsLicenseAgent/ws/rest/request/";// "https://covid19.th-stat.com";
//const baseURL = "http://localhost:8080/wsLicenseAgent/ws/rest/request/";
const baseURL = "https://dev-smws.thailife.com:8443/wsLicenseAgentSpring/licenseexam";

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