import api from "./api2";


export const getLicenseByCid = async (length) => {
    try {
        const response = await api.get(`/license/search?citizenId=${length}`);
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        throw err;
    }
}