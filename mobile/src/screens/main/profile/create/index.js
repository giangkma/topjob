import { LoadingScreen, ProfileForm } from 'components';
import { navigate } from 'navigators/utils';
import { useDispatch } from 'react-redux';
import { newOrganizationThunk } from 'store/auth';
import { showAlert } from 'utilities';
import React, { useState } from 'react';

export const CreateProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async data => {
        try {
            setLoading(true);
            data.establishedDate = new Date();
            await dispatch(newOrganizationThunk(data));
            showAlert('Create organization successfully', 'Success');
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
