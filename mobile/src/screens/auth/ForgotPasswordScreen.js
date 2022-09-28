import { accountApi } from 'apis';
import { Chevronleft, Code, Email, Lock } from 'assets';
import { Colors } from 'assets/Colors';
import { navigate } from 'navigators/utils';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import {
    Layout,
    LoadingScreen,
    Modal,
    PrimaryButton,
    StyledTextInput,
} from 'screens';
import { scaleSize, showAlert } from 'utilities';
import { BackPageButton } from 'components';

export const ForgotPasswordScreen = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {},
    });

    const [email, setEmail] = useState('giangdt.kma@gmail.com');
    const [isSendCodeSuccess, setIsSendCodeSuccess] = useState(false);
    const [isResetSuccess, setResetSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSendCode = async () => {
        try {
            setLoading(true);
            await accountApi.getSendVerifyCode(email);
            setIsSendCodeSuccess(true);
            showAlert(
                "We've sent a verification code to your email",
                'Success',
            );
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onResetPassword = async data => {
        try {
            setLoading(true);
            console.log(data);
            const { code, password } = data;
            await accountApi.postResetPassword(email, password, code);
            setResetSuccess(true);
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onLoginWithNewPassword = () => {
        setResetSuccess(false);
        navigate('Login', {
            email,
            password: getValues('password'),
        });
    };

    return (
        <Layout marginT-30>
            {loading && <LoadingScreen />}
            <Modal
                visible={isResetSuccess}
                text="Reset successful"
                description="You can login now with this new password!"
                agreeButton={{
                    text: 'Login now',
                    onPress: onLoginWithNewPassword,
                }}
                loading={loading}
            />
            <View width="100%" flex paddingB-50 paddingH-32>
                <BackPageButton text="Forgot Password" navigateTo={'Login'} />
                <ScrollView>
                    {isSendCodeSuccess ? (
                        <>
                            <View paddingH-8 marginB-20>
                                <Text grey fs15 fw5 font-medium>
                                    Create a new password for account:
                                </Text>
                                <Text primary fs15 fw7 font-bold>
                                    {email}
                                </Text>
                            </View>
                            <Controller
                                control={control}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <StyledTextInput
                                        icon={<Lock />}
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        placeholder="New password"
                                        type="password"
                                        required
                                        error={
                                            errors.password &&
                                            errors.password.message
                                        }
                                    />
                                )}
                                name="password"
                                rules={{ required: 'New Password is required' }}
                            />
                            <View marginT-10>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledTextInput
                                            icon={<Lock />}
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            placeholder="Confirm password"
                                            type="password"
                                            required
                                            error={
                                                errors.confirm_password &&
                                                errors.confirm_password.message
                                            }
                                        />
                                    )}
                                    name="confirm_password"
                                    rules={{
                                        required:
                                            'Confirm Password is required',
                                        validate: value => {
                                            if (
                                                value !== getValues('password')
                                            ) {
                                                return 'Confirm Password is not match';
                                            }
                                        },
                                    }}
                                />
                            </View>
                            <View marginT-10>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <StyledTextInput
                                            icon={<Code />}
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            placeholder="Code"
                                            required
                                            error={
                                                errors.code &&
                                                errors.code.message
                                            }
                                        />
                                    )}
                                    name="code"
                                    rules={{
                                        required: 'Code is required',
                                    }}
                                />
                            </View>
                            <View row right marginT-15 marginB-26>
                                <Text grey fs15 fw3 font-light>
                                    I did not receive the code !
                                </Text>
                                <TouchableOpacity onPress={onSendCode}>
                                    <Text primary fs15 fw7 font-bold marginL-10>
                                        Resend
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <StyledTextInput
                            icon={<Email />}
                            value={email}
                            placeholder="Email"
                            onChange={setEmail}
                            required
                        />
                    )}
                </ScrollView>
                <View>
                    {isSendCodeSuccess ? (
                        <PrimaryButton
                            onPress={handleSubmit(onResetPassword)}
                            text="Save"
                        />
                    ) : (
                        <PrimaryButton onPress={onSendCode} text="Send code" />
                    )}
                    <View row center marginT-24>
                        <Text grey fs15 fw5 font-medium>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigate('Signup')}>
                            <Text primary fs15 fw7 font-bold marginL-10>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Layout>
    );
};
