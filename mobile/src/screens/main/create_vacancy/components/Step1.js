import { EditCircle, UploadCircle } from 'assets';
import { Colors } from 'assets/Colors';
import { images } from 'assets/Images';
import { PrimaryButton } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { StyledTextInput } from 'screens';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const Step1CreateVacancy = ({ onNextStep, data }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: data.get(),
    });

    useFocusEffect(
        useCallback(() => {
            if (data.get()) {
                reset(data.get());
            }
        }, [data]),
    );

    const onSubmit = value => {
        data.set(value);
        onNextStep();
    };

    return (
        <ScrollView style={{ maxHeight: '100%' }}>
            {images.gameHint ? (
                <TouchableOpacity marginT-20 row center>
                    <View style={{ position: 'relative' }}>
                        <Image source={images.gameHint} style={styles.logo} />
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
                    rules={{ required: 'Salary is required' }}
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
            <View marginT-10>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledTextInput
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder="Type"
                            required
                            error={errors.type && errors.type.message}
                        />
                    )}
                    name="type"
                    rules={{ required: 'Type is required' }}
                />
            </View>
            <PrimaryButton
                onPress={handleSubmit(onSubmit)}
                marginT-30
                marginB-20
                text="Next"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({});
