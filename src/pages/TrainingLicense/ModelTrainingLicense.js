import apiSpring from "../../api/apiSpring";

export const insertTrainingLicense = async (request) => {
  try {
    const response = await apiSpring.post("license/add", request);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};

//----------------------------for update spring boot------------------------
export const updateTrainingLicense = async (request) => {
  try {
    const response = await apiSpring.put("/license/update", request);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};

// export const deleteTrainingLicense = async (citizenId, scheduleId) => {
//   try {
//     const response = await apiSpring.delete(
//       `examapplication/delete?citizenId=${citizenId}&scheduleId=${scheduleId}`
//     );
//     if (response.status === 200) return response.data;
//     else throw new Error();
//   } catch (err) {
//     throw err;
//   }
// };

//----------------------------for update spring boot------------------------
export const getMoveCompany = async (citizenId) => {
  try {
    const response = await apiSpring.get(
      `moveCompany/search?citizenId=${citizenId}`
    );
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};
