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

export const updateExamSchedule = async (examSchedule) => {
    try {
        const inputPut = examSchedule;
        console.log("inputPut",inputPut);
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

export const deleteExamSchedule = async (examSchedule) => {
    try {
        console.log('deleteExamLocation ', examSchedule);
        const locationId = examSchedule;
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

export const getExamSchedule = async () => {
    try {
        
        const response = await api.get(`/examschedule/searchGET`);
        if (response.status === 200) {
            console.log('getExamSchedule response ', response.data);
            return response;
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