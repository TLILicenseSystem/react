import api from "./api2";

export const getTrainingByCid = async (type = "KRKT", citizenId) => {
  try {
    const response = await api.get(
      `training/search/result?type=${type}&citizenId=${citizenId}`
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
