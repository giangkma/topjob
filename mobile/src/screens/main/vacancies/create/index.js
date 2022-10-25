import { BackPageButton, LoadingScreen, PrimaryButton } from 'components';
import { Config } from 'config';
import { navigate } from 'navigators/utils';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { Layout } from 'screens';
import { deleteJobVacancyThunk, updateJobVacancyThunk } from 'store/auth';
import { showAlert } from 'utilities';
import {
    Step1CreateVacancy,
    Step2CreateVacancy,
    Step3CreateVacancy,
    Step4CreateVacancy,
} from './components';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const menu = ['Job Details', 'Requirements', 'Benefits'];

const initialVacancy = {
    position: null,
    salary: null,
    location: null,
    type: null,
    requirements: [],
    benefits: [],
    status: Config.VACANCY_STATUS.ACTIVE,
};

export const CreateVacancyScreen = ({ navigation, route }) => {
    const isUpdate = !!route?.params?.vacancy;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialVacancy);

    const [currentStep, setCurrentStep] = useState(1);

    const onPrevStep = () => {
        if (currentStep === 1) {
            navigation.goBack();
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    const onNextStep = value => {
        const newData = { ...data, ...value };
        setData(newData);
        if (isUpdate) {
            return onUpdateJobVacancy(newData);
        }
        setCurrentStep(currentStep + 1);
    };

    const onUpdateJobVacancy = async newData => {
        try {
            setLoading(true);
            await dispatch(updateJobVacancyThunk(newData));
            showAlert("You've updated a job vacancy", 'Update success');
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onResetFormVacancy = () => {
        setData(initialVacancy);
        setCurrentStep(1);
    };

    const onRemove = async () => {
        try {
            if (!isUpdate || !data) {
                return;
            }
            setLoading(true);
            await dispatch(deleteJobVacancyThunk(data._id));
            showAlert("You've deleted a job vacancy", 'Delete success');
            navigate('Vacancies');
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 2: // requirements
                return (
                    <Step2CreateVacancy
                        onNextStep={onNextStep}
                        vacancy={data}
                    />
                );
            case 3: // benefits
                return (
                    <Step3CreateVacancy
                        onNextStep={onNextStep}
                        vacancy={data}
                    />
                );
            case 4: // benefits
                return (
                    <Step4CreateVacancy
                        onResetFormVacancy={onResetFormVacancy}
                        vacancy={data}
                    />
                );
            default: // infor
                return (
                    <Step1CreateVacancy
                        onNextStep={onNextStep}
                        vacancy={data}
                    />
                );
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (route?.params?.vacancy) {
                setData(route.params.vacancy);
            }
        }, [route?.params?.vacancy]),
    );

    return (
        <Layout paddingB-10>
            {loading && <LoadingScreen />}
            <BackPageButton
                text={isUpdate ? 'Vacancies' : 'Create Vacancies'}
                onPress={onPrevStep}
                elementRight={
                    isUpdate && (
                        <TouchableOpacity onPress={onRemove}>
                            <Text error fs14 font-extraBold>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    )
                }
                navigateTo="Vacancies"
            />

            {currentStep !== 4 && (
                <View row marginB-6>
                    {menu.map((item, index) => {
                        const isAcive = currentStep === index + 1;
                        return (
                            <PrimaryButton
                                onPress={() => {
                                    if (!isUpdate) return;
                                    setCurrentStep(index + 1);
                                }}
                                marginR-8
                                text={item}
                                small
                                fontSize={13}
                                border={!isAcive}
                                disabled={!isUpdate}
                            />
                        );
                    })}
                </View>
            )}
            {renderStep()}
        </Layout>
    );
};

const styles = StyleSheet.create({});
