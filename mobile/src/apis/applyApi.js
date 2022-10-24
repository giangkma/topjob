import { axios } from 'libs';

const URL = '/apply';

export const applyApi = {
    getAllApply: organizationId => {
        return axios.get(`${URL}/all/${organizationId}`);
    },
    getAllApplyByVacancyId: vacancyId => {
        return axios.get(`${URL}/vacancy/${vacancyId}`);
    },
    getOneApply: applyId => {
        return axios.get(`${URL}/${applyId}`);
    },
    postCreateApply: (vacancyId, data) => {
        return axios.post(`${URL}/${vacancyId}`, data);
    },
    sendToApplication: (applyId, data) => {
        return axios.put(`${URL}/${applyId}`, data);
    },
};
