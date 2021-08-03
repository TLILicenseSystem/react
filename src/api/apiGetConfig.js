import examLocation from "../conf/examLocation.json";
import { get } from "lodash"

export const getExamLocationZone=()=>{
  //console.log("examLocationZone: ", get(examLocation,"region",[]));
  return get(examLocation,"region",[]);
};

export const getExamType=()=>{
  console.log("getExamType: ", get(examLocation,"examType",[]));
  return get(examLocation,"examType",[]);
};