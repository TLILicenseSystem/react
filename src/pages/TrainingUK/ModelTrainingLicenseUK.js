import apiSpring from "../../api/apiSpring";

export const insertTrainingLicenseSIC = async (request) => {
  try {
    const response = await apiSpring.post("licenseSIC/add", request);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};

//----------------------------for update spring boot------------------------
export const updateTrainingLicenseSIC = async (request) => {
  try {
    const response = await apiSpring.put("/licenseSIC/update", request);
    if (response.status === 200)
      //data=success
      return response.data;
    else throw new Error();
  } catch (err) {
    throw err;
  }
};
