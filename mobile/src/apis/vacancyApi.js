import { axios } from 'libs';

const URL = '/vacancy';

export const vacancyApi = {
    getVacanciesOfOrganization: organizationId => {
        return axios.get(`${URL}/all/${organizationId}`);
    },
    updateJobVacancy: data => {
        return axios.put(`${URL}/${data._id}`, data);
    },
    postJobVacancy: data => {
        return axios.post(URL, data);
    },
    deleteJobVacancy: id => {
        return axios.delete(`${URL}/${id}`);
    },
};
