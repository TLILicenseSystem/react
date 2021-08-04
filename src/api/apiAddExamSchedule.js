import api from "./api2";

export const addExamSchedule = async (examSchedule) => {
    try {
        const inputPost = examSchedule;
        console.log("examSchedule " , inputPost);
        const response = await api.post(`/examschedule/add`, inputPost);
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

export const updateExamSchedule = async (examLocation) => {
    try {
        const inputPut = examLocation;
        const response = await api.put(`/examschedule/update`, inputPut);
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