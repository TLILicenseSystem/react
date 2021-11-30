import api from "./api2";

export const addExamLocation = async (examLocation) => {
  try {
    const inputPost = examLocation;
    const response = await api.post(`examlocation/add`, inputPost);
    if (response.status === 200) {
      console.log("addExamLocation response ", response.data);
      return response.data;
    } else throw new Error();
  } catch (err) {
    throw err;
  }
};

export const updateExamLocation = async (examLocation) => {
  try {
    const inputPut = examLocation;
    const response = await api.put(`examlocation/update`, inputPut);
    if (response.status === 200) {
      console.log("updateExamLocation response ", response.data);
      return response.data;
    } else throw new Error();
  } catch (err) {
    throw err;
  }
};

export const deleteExamLocation = async (examLocation) => {
  try {
    const locationId = examLocation;
    const response = await api.delete(`examlocation/delete/${locationId}`);
    if (response.status === 200) {
      console.log("deleteExamLocation response ", response.data);
      return response.data;
    } else throw new Error();
  } catch (err) {
    throw err;
  }
};
