import api from "./api2";

export const getTrainingByCid = async (length) => {
  try {
    const response = await api.get(
      `training/search/result?citizenId=${length}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (err) {
    throw err;
  }
};
