import api from "./api2";

export const getOrganizerAll = async () => {
    try {
        const response = await api.get(`examorganizer/searchGET`);
        if (response.status === 200) {
            console.log('getOrganizerAll response ', response.data);
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

export const getOrganizer = async (provinceCode) => {
    try {
        const inputPost = {};
        const response = await api.post(`examorganizer/search?type=${provinceCode}`, inputPost);
        if (response.status === 200) {
            console.log('getOrganizer response ', response.data);
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