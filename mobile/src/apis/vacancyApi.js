import { axios } from 'libs';

const URL = '/vacancy';

export const vacancyApi = {
    getVacanciesOfOrganization: organizationId => {
        return axios.get(`${URL}/all/${organizationId}`);
    },
};
