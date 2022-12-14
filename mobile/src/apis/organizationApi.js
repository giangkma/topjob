import { axios } from 'libs';

const URL = '/organization';

export const organizationApi = {
    postCreate: data => {
        return axios.post(`${URL}`, data);
    },
    putUpdate: (id, data) => {
        return axios.put(`${URL}/${id}`, data);
    },
};
