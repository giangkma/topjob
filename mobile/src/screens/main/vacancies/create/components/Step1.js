import { EditCircle, UploadCircle } from 'assets';
import { Colors } from 'assets';
import { images } from 'assets/Images';
import { PrimaryButton, StyledSelectInput } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import {
    Image,
    Picker,
    Text,
    TouchableOpacity,
    View,
} from 'react-native-ui-lib';
import { StyledTextInput } from 'screens';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Config } from 'config';
import { useGetLogoVacancy } from 'hooks';
import { scaleSize } from 'utilities';

export const Step1CreateVacancy = ({ onNextStep, vacancy }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: vacancy,
    });

    useFocusEffect(
        useCallback(() => {
            if (vacancy) {
                reset(vacancy);
            }
        }, [vacancy]),
    );

    const onSubmit = value => {
        onNextStep(value);
    };

    const isUpdate = !!vacancy._id;

    const imageVacancy = useGetLogoVacancy(vacancy);

    return (
        <ScrollView style={{ maxHeight: '100%' }}>
            {imageVacancy ? (
                <TouchableOpacity marginT-20 row center>
                    <View style={{ position: 'relative' }}>
                        <Image source={imageVacancy} style={styles.image} />
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
                    marginT-15
                >
                    <UploadCircle />
                    <Text marginL-10 grey fs13 marginT-10>
                        Upload Vacancy Logo (optional)
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
                        placeholder="Open Position"
                        required
                        error={errors.position && errors.position.message}
                    />
                )}
                name="position"
                rules={{ required: 'Open Position is required' }}
            />
            <View marginT-10>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledTextInput
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder="Salary"
                            required
                            error={errors.salary && errors.salary.message}
                        />
                    )}
                    name="salary"
                    rules={{
                        required: 'Salary is required',
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Salary must be a number',
                        },
                    }}
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
                            placeholder="Location"
                            required
                            error={errors.location && errors.location.message}
                        />
                    )}
                    name="location"
                    rules={{ required: 'Location is required' }}
                />
            </View>
            <View marginT-10 row>
                <View flex-3>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledSelectInput
                                error={errors.type && errors.type.message}
                                placeholder="Select Type"
                                items={[
                                    {
                                        label: 'Full Time',
                                        value: Config.VACANCY_TYPES.FULL_TIME,
                                    },
                                    {
                                        label: 'Part Time',
                                        value: Config.VACANCY_TYPES.PART_TIME,
                                    },
                                    {
                                        label: 'Freelance',
                                        value: Config.VACANCY_TYPES.FREELANCE,
                                    },
                                ]}
                                label="Type"
                                value={value}
                                onChange={onChange}
                                required
                            />
                        )}
                        name="type"
                        rules={{ required: 'Type is required' }}
                    />
                </View>
                <View flex-2 marginL-10>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledSelectInput
                                placeholder="Select Status"
                                items={[
                                    {
                                        label: 'Active',
                                        value: Config.VACANCY_STATUS.ACTIVE,
                                    },
                                    {
                                        label: 'In Active',
                                        value: Config.VACANCY_STATUS.INACTIVE,
                                    },
                                ]}
                                label="Status"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                        name="status"
                    />
                </View>
            </View>
            <PrimaryButton
                onPress={handleSubmit(onSubmit)}
                marginT-30
                marginB-20
                text={isUpdate ? 'Update Vacancy' : 'Next'}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: scaleSize(100),
        height: scaleSize(100),
        borderRadius: 10,
    },
});
