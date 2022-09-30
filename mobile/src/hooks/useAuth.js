import {
    getOrganization,
    getUser,
    onLogout,
    setOrganization,
} from 'store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { tokenStorage } from 'utilities';
import { useEffect } from 'react';

export const useAuth = () => {
    const user = useSelector(getUser);
    const organization = useSelector(getOrganization);
    const token = tokenStorage.get();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user || !token) {
            dispatch(onLogout());
        } else if (!organization) {
            dispatch(setOrganization(user.organizations[0]));
        }
    }, [token, user]);

    return {
        isLogged: !!token && !!user,
        user,
        organization,
    };
};
