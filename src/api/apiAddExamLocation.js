import api from "./api2";

export const addExamLocation = async (examLocation) => {
    try {
        const inputPost = examLocation;
        const response = await api.post(`/examlocation/add`, inputPost);
        if (response.status === 200) {
            console.log('addExamLocation response ', response.data);
            return response.data;
        }
        else {
            console.log('addExamLocation response ', response.data);
            return "error";
        }
    }
    catch (err) {
        console.log("msg", err);
        return "error";
    }
}

export const updateExamLocation = async (examLocation) => {
    try {
        const inputPut = examLocation;
        const response = await api.put(`/examlocation/update`, inputPut);
        if (response.status === 200) {
            console.log('updateExamLocation response ', response.data);
            return response.data;
        }
        else {
            console.log('updateExamLocation response ', response.data);
            return "error";
        }
    }
    catch (err) {
        console.log("msg", err);
        return "error";
    }
}

export const deleteExamLocation = async (examLocation) => {
    try {
        console.log('deleteExamLocation ', examLocation);
        const locationId = examLocation;
        const response = await api.delete(`/examlocation/delete/${locationId}`);
        if (response.status === 200) {
            console.log('deleteExamLocation response ', response.data);
            return response.data;
        }
        else {
            return response.data;
        }
    }
    catch (err) {
        console.log("msg", err);
        return "error";
    }
}