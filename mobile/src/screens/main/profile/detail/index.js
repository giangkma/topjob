import { LoadingScreen, ProfileForm } from 'components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganization, updateOrganizationThunk } from 'store/auth';
import { showAlert } from 'utilities';

export const ProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const organization = useSelector(getOrganization);
    const dispatch = useDispatch();

    const onSubmit = async data => {
        try {
            if (!organization) return;
            setLoading(true);
            await dispatch(updateOrganizationThunk(data));
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {loading && <LoadingScreen />}
            <ProfileForm
                onSubmit={onSubmit}
                paddingB-100
                title="Organization Profile"
                enableLogOut
                organization={organization}
            />
        </>
    );
};
