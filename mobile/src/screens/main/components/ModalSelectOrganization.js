import { useFocusEffect } from '@react-navigation/native';
import { navigate } from 'navigators/utils';
import { useCallback } from 'react';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, PrimaryButton } from 'screens';
import {
    getInitStateForOrganizationThunk,
    getOrganization,
    getUser,
} from 'store/auth';
import { showAlert } from 'utilities';
import React, { useState } from 'react';

export const ModalSelectOrganization = ({ visible, onClose }) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(getUser);
    const organization = useSelector(getOrganization);
    const [organizationSelect, setOrganizationSelect] = useState(organization);
    const dispatch = useDispatch();

    const onChange = async () => {
        try {
            if (organizationSelect._id === organization._id) {
                return onClose();
            }
            setLoading(true);
            await dispatch(
                getInitStateForOrganizationThunk(organizationSelect),
            );
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (organization) {
                setOrganizationSelect(organization);
            }
        }, [organization]),
    );

    return (
        <>
            <Modal
                visible={visible}
                text="Select Organization"
                agreeButton={{
                    text: 'Save',
                    onPress: onChange,
                }}
                iconClose
                onClose={onClose}
                cancelButton={{
                    text: 'Create new',
                    onPress: () => navigate('CreateOrganization'),
                }}
                loading={loading}
            >
                <View marginB-10>
                    {user?.organizations?.map((item, index) => {
                        const isSelected = item._id === organizationSelect?._id;
                        return (
                            <PrimaryButton
                                key={index}
                                border={!isSelected}
                                text={item.name}
                                onPress={() => setOrganizationSelect(item)}
                                marginB-10
                            />
                        );
                    })}
                </View>
            </Modal>
        </>
    );
};
