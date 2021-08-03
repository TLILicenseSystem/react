import api from "./api2";

export const getExamRoundAll = async () => {
    try {
        const response = await api.get(`/examround/searchGET`);
        console.log("getExamRoundAll " ,response);
        if (response.status === 200) {
            console.log('getExamroundAll response ', response.data);
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