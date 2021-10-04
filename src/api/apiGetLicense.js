import apiSpring from "./apiSpring";

export const getLicenseHistoryByCid = async (citizenId) => {
  try {
    const response = await apiSpring.get(
      `license/search/history?citizenId=${citizenId}`
    );
    if (response.status === 200) {
      return response;
    } else {
      return response.data;
    }
  } catch (err) {
    return "error";
  }
};
