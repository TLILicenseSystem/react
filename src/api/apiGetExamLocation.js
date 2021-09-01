import api from "./api2";

export const getExamLocationAll = async () => {
    try {
        const response = await api.get(`examlocation/searchGET`);
        if (response.status === 200) {
            console.log('getExamLocationAll response ', response.data);
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

export const getExamLocation = async (locationId) => {
    try {
        const inputPost = {};
        const response = await api.post(`examlocation/search?type=${locationId}`, inputPost);
        if (response.status === 200) {
            console.log('getExamLocation response ', response.data);
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