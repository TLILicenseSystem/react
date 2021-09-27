import { useState, useEffect } from "react";
import apiSpring from "../../api/apiSpring";
import axios from "axios";

 //const baseURL = "https://dev-smws.thailife.com:8443/wsSearchSalesByName/rest";
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

export const getExamApplication = async (citizenID) => {
    try {
        const response = await apiSpring.get(`examapplication/search?citizenID=${citizenID}`);
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("msg", err);
        throw err;
    }
}

export const searchSalesbyname = async (firstName,lastName) => {
    try {
        const inputPost = 
        {"headerData":{
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
         };
        const response = await api.get(`searchsalesbyname/search`);
       
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("msg", err);
        throw err;
    }
}

export const insertExamOrganizer = async (request) => {

    try
    {
    const response = await apiSpring.post("/examapplication/add",request);   
    console.log("insertExamOrganizer response=",response.data);
    if (response.status === 200) //data=success
        return response.data;
    else 
        throw new Error();
    }
    catch (err) 
    {  
    throw err;
    }
};

//----------------------------for update spring boot------------------------
export const updateExamApplication= async (request) => {
    try
    {
        const response = await apiSpring.put("/examapplication/update",request);  
        console.log("updateExamOrganizer response=",response.data);
        if (response.status === 200) //data=success
            return response.data;
        else 
            throw new Error();
    }
    catch (err) 
    {  
        throw err;
    }
};





