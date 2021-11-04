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

export const getLicenseByCid = async (citizenId) => {
  try {
    const response = await apiSpring.get(
      `license/search?citizenId=${citizenId}`
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

export const getLicenseULHistoryByCid = async (citizenId) => {
  try {
    const response = await apiSpring.get(
      `licenseUL/search/history?citizenId=${citizenId}`
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

export const getLicenseULByCid = async (citizenId) => {
  try {
    const response = await apiSpring.get(
      `licenseUL/search?citizenId=${citizenId}`
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
