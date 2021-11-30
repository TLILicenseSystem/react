import api from "./api2";

export const getStatusActive = async (status) => {
  try {
    const response = await api.get(`data/sales/status/check?status=${status}`);
    if (response.status === 200) {
      return response && response.data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log("msg", err);
    throw err;
  }
};

export const calLicenseTime = async (citizenId, offerType, expireDate) => {
  try {
    const response = await api.get(
      `/license/calLicenseTime?citizenId=${citizenId}&offerType=${offerType}&expireDate=${expireDate}`
    );
    if (response.status === 200) {
      return response && response.data;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log("msg", err);
    throw err;
  }
};