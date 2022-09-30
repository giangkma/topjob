import { axios } from 'libs';

const URL = '/apply';

export const applyApi = {
    postCreate: data => {
        return axios.post(`${URL}`, data);
    },
};
