import { useState, useEffect } from "react";
import apiSpring from "../../api/apiSpring";

export const insertExamRound = async (
  roundId,
  timeStr,
  createUserCode,
  updateUserCode
) => {
  const request = {
    roundId: roundId,
    timeStr: timeStr,
    createUserCode: createUserCode,
    updateUserCode: updateUserCode,
  };
  try {
    const response = await apiSpring.post("/examround/add", request);
    console.log("insertExamRoundProcess response=", response.data);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};

export const updateExamRound = async (
  roundId,
  timeStr,
  createUserCode,
  updateUserCode
) => {
  const request = {
    roundId: roundId,
    timeStr: timeStr,
    createUserCode: createUserCode,
    updateUserCode: updateUserCode,
  };
  try {
    const response = await apiSpring.post("/examround/add", request);
    console.log("updateExamRound response=", response.data);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};
export const deleteExamRound = async (roundId) => {
  try {
    const response = await apiSpring.delete("/examround/delete/" + roundId);
    console.log("deleteExamRound status=", response.data);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};
