import examLocation from "../conf/examLocation.json";
import { get } from "lodash"
import api from "./api2";

export const getExamLocationZone=()=>{
  //console.log("examLocationZone: ", get(examLocation,"region",[]));
  return get(examLocation,"region",[]);
};

export const getExamType=()=>{
  //console.log("getExamType: ", get(examLocation,"examType",[]));
  return get(examLocation,"examType",[]);
};



export const getExamResult = async () =>{
  try {
    const response = await api.get(`data/examresult`);
    if (response.status === 200) {
        return response;
    }
    else {
        throw new Error();
    }
}
  catch (err) {
      console.log("msg", err);
      throw err;
  }
};

export const getCauseByType = async () =>{
  try {
    const response = await api.get(`disapprove/type/search?licenseType=1`);
    if (response.status === 200) {
        return response;
    }
    else {
        throw new Error();
    }
}
  catch (err) {
      console.log("msg", err);
      throw err;
  }
};

export const getCompany = async () =>{
  try {
    const response = await api.get(`data/search/company?companyId=A`);
    if (response.status === 200) {
        return response;
    }
    else {
        throw new Error();
    }
}
  catch (err) {
      console.log("msg", err);
      throw err;
  }
};