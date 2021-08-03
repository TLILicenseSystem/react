import api from "./api2";

export const getProvinceCodeAll = async () => {
    try {
        const response = await api.get(`/examregion/searchGET`);
        if (response.status === 200) {
            console.log('getProvinceCodeAll response ', response.data);
            return response;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("msg", err);
        throw err;
    }
}

export const getProvinceCode = async (provinceCode) => {
    try {
        const inputPost = {};
        const response = await api.post(`/examregion/search?type=${provinceCode}`, inputPost);
        if (response.status === 200) {
            console.log('getProvinceCode response ', response.data);
            return response.data;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("msg", err);
        throw err;
    }
}