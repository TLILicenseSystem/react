import apiSpring from "../../api/apiSpring";

export const insertTrainingLicenseUL = async (request) => {
  try {
    const response = await apiSpring.post("licenseUL/add", request);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};

//----------------------------for update spring boot------------------------
export const updateTrainingLicenseUL = async (request) => {
  try {
    const response = await apiSpring.put("/licenseUL/update", request);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};
