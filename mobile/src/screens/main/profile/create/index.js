import { organizationApi } from 'apis';
import { LoadingScreen, ProfileForm } from 'components';
import { navigate } from 'navigators/utils';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getOrganization,
    newOrganizationThunk,
    updateOrganizationThunk,
} from 'store/auth';
import { showAlert } from 'utilities';

export const CreateProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const organization = useSelector(getOrganization);
    const dispatch = useDispatch();

    const onSubmit = async data => {
        try {
            setLoading(true);
            data.establishedDate = new Date();
            await dispatch(newOrganizationThunk(data));
            showAlert('Create organization successfully');
            navigate('Home');
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <LoadingScreen />}
            <ProfileForm back onSubmit={onSubmit} title="New Organization" />
        </>
    );
};
