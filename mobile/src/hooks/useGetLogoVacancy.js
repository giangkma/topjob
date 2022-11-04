import { useSelector } from 'react-redux';
import { getOrganization } from 'store/auth';

export const useGetLogoVacancy = vacancy => {
    const organization = useSelector(getOrganization);

    if (vacancy && vacancy.image) {
        return { uri: vacancy.image };
    } else if (organization && organization.logo)
        return { uri: organization.logo };
};
