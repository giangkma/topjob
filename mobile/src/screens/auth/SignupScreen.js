import { accountApi } from 'apis';
import { Email, Lock, Person } from 'assets';
import { navigate } from 'navigators/utils';
import { LoadingScreen, PrimaryButton, StyledTextInput } from 'screens';
import { showAlert } from 'utilities';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native-ui-lib';
import { AuthLayout } from './components';

export const SignupScreen = () => {
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {
        try {
            setLoading(true);
            await accountApi.postRegisterAccount(
                data.email.toLowerCase(),
                data.name,
                data.password,
            );
            navigate('Login', {
                email: data.email.toLowerCase(),
                password: data.password,
            });
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout text="Sign up for free">
            {loading && <LoadingScreen />}
            <View marginB-27>
                <View marginV-10>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledTextInput
                                icon={<Email />}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder="Email"
                                required
                                error={errors.email && errors.email.message}
                            />
                        )}
                        name="email"
                        rules={{ required: 'Email is required' }}
                    />
                </View>
                <View marginB-10>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledTextInput
                                type="password"
                                icon={<Lock />}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder="Password"
                                required
                                error={
                                    errors.password && errors.password.message
                                }
                            />
                        )}
                        name="password"
                        rules={{ required: 'Password is required' }}
                    />
                </View>
            </View>
            <PrimaryButton onPress={handleSubmit(onSubmit)} text="Sign up" />
        </AuthLayout>
    );
};
