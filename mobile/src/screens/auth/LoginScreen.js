import { accountApi } from 'apis';
import { Email, Lock } from 'assets';
import { navigate } from 'navigators/utils';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { LoadingScreen, PrimaryButton, StyledTextInput } from 'screens';
import { loginThunk, setUser } from 'store/auth';
import { showAlert, tokenStorage } from 'utilities';
import { AuthLayout } from './components';

export const LoginScreen = ({ route }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async data => {
        try {
            setLoading(true);
            await dispatch(loginThunk(data));
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (route.params) {
            setValue('email', route.params.email);
            setValue('password', route.params.password);
        }
    }, [route.params]);

    return (
        <AuthLayout text="Sign in to your account">
            {loading && <LoadingScreen />}
            <View marginB-10>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledTextInput
                            icon={<Email />}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder="Email"
                            label="Email"
                            required
                            error={errors.email && errors.email.message}
                        />
                    )}
                    name="email"
                    rules={{ required: 'Email is required' }}
                />

                <View marginV-10>
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
                                label="Password"
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
            <View row right marginB-36>
                <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                    <Text primary fs15 fw5 font-medium>
                        Forgot the password?
                    </Text>
                </TouchableOpacity>
            </View>
            <PrimaryButton onPress={handleSubmit(onSubmit)} text="Sign in" />
        </AuthLayout>
    );
};
