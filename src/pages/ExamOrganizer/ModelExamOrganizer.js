import { useState, useEffect } from "react";
import apiSpring from "../../api/apiSpring";

export const insertExamOrganizer = async (orgCode, orgName, createUserCode,updateUserCode) => {

    const request = {
    orgCode: orgCode,
    orgName: orgName,
    createUserCode: createUserCode,
    updateUserCode: updateUserCode 
    };
    try
    {
    const response = await apiSpring.post("/examorganizer/add",request);   
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
export const updateExamOrganizer= async (orgCode, orgName, createUserCode,updateUserCode) => {

    const request = {
    orgCode: orgCode,
    orgName: orgName,
    createUserCode: createUserCode,
    updateUserCode: updateUserCode 
    };

    try
    {
        const response = await apiSpring.put("/examorganizer/update",request);  
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
//----------------------------for delete spring boot------------------------
export const deleteExamOrganizer = async (orgCode) => {

    const response = await apiSpring.delete("/examorganizer/delete/"+orgCode);  
    console.log("deleteExamOrganizer response=",response.data);
    try
    {
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