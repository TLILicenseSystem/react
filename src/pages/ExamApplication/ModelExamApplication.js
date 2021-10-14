import apiSpring from "../../api/apiSpring";

export const getExamApplication = async (citizenID) => {
  try {
    const response = await apiSpring.get(
      `examapplication/search?citizenID=${citizenID}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log("msg", err);
    throw err;
  }
};

export const insertExamApplication = async (request) => {
  try {
    const response = await apiSpring.post("examapplication/add", request);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};

//----------------------------for update spring boot------------------------
export const updateExamApplication = async (request) => {
  try {
    const response = await apiSpring.put("/examapplication/update", request);
    console.log("updateExamOrganizer response=", response.data);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};



export const deleteExamApplication = async (citizenId,scheduleId) => {
  try {
    const response = await apiSpring.delete(`examapplication/delete?citizenId=${citizenId}&scheduleId=${scheduleId}`);
    if (response.status === 200)
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};
