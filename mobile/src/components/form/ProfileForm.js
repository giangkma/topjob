import { accountApi } from 'apis';
import {
    EditCircle,
    Email,
    Lock,
    LogoIcon,
    Logout,
    UploadCircle,
} from 'assets';
import { Colors, ArrowDown } from 'assets';
import { images } from 'assets/Images';
import { PrimaryButton, WrapIconButton, BackPageButton } from 'components';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { Layout, LoadingScreen, StyledTextInput } from 'screens';
import { onLogout } from 'store/auth';
import { ModalSelectOrganization } from 'screens/main/components';

export const ProfileForm = ({
    enableLogOut,
    title = 'Profile',
    onSubmit,
    organization,
    back,
    ...props
}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [isChangeCompany, setIsChangeCompany] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            country: '',
            address: '',
        },
    });

    useEffect(() => {
        if (organization) {
            reset(organization);
        }
    }, [organization]);

    return (
        <Layout {...props}>
            <ModalSelectOrganization
                visible={isChangeCompany}
                onClose={() => setIsChangeCompany(false)}
            />
            {loading && <LoadingScreen />}
            <View width="100%" row centerV spread paddingB-15>
                <View row centerV>
                    {back ? (
                        <BackPageButton text={title} />
                    ) : (
                        <View row centerV>
                            <LogoIcon />
                            <Text marginL-10 black fs17 fw7>
                                {title}
                            </Text>
                        </View>
                    )}
                    {organization && (
                        <TouchableOpacity
                            marginL-5
                            onPress={() => setIsChangeCompany(true)}
                        >
                            <ArrowDown />
                        </TouchableOpacity>
                    )}
                </View>
                {enableLogOut && (
                    <WrapIconButton
                        bg-red2
                        onPress={() => dispatch(onLogout())}
                        icon={<Logout />}
                    />
                )}
            </View>
            <ScrollView style={{ maxHeight: '100%' }}>
                {images.gameHint ? (
                    <TouchableOpacity marginT-20 row center>
                        <View style={{ position: 'relative' }}>
                            <Image
                                source={images.gameHint}
                                style={styles.logo}
                            />
                            <View absB absR>
                                <EditCircle />
                            </View>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        center
                        style={{ borderWidth: 1, borderColor: Colors.grey2 }}
                        br10
                        padding-20
                        bg-white
                    >
                        <UploadCircle />
                        <Text marginL-10 grey fs13 marginT-10>
                            Upload Company Logo
                        </Text>
                    </TouchableOpacity>
                )}
                <View width="100%" height={2} bg-grey2 marginT-15 marginB-10 />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledTextInput
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder="Name of Company"
                            required
                            error={errors.name && errors.name.message}
                        />
                    )}
                    name="name"
                    rules={{ required: 'Name of Company is required' }}
                />
                <View marginT-10>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledTextInput
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder="Company Email"
                                required
                                error={errors.email && errors.email.message}
                            />
                        )}
                        name="email"
                        rules={{ required: 'Company Email is required' }}
                    />
                </View>
                <View marginT-10>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledTextInput
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder="Country"
                                required
                                error={errors.country && errors.country.message}
                            />
                        )}
                        name="country"
                        rules={{ required: 'Country is required' }}
                    />
                </View>
                <View marginT-10>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledTextInput
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder="Company Address"
                                required
                                error={errors.address && errors.address.message}
                            />
                        )}
                        name="address"
                        rules={{ required: 'Company Address is required' }}
                    />
                </View>
                <PrimaryButton
                    onPress={handleSubmit(onSubmit)}
                    marginT-30
                    text="Confirm"
                />
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
});
