import { Colors, Images } from 'assets';
import {
    BackPageButton,
    Layout,
    LoadingScreen,
    PrimaryButton,
    StyledSelectInput,
} from 'components';
import React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { cutString, scaleSize, showAlert } from 'utilities';
import Textarea from 'react-native-textarea';
import { Config } from 'config';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import { ReviewRequirements } from '../components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendToApplicantThunk } from 'store/auth';

// convert date to DD/MM/YYYY
const convertDateToStringDay = date => {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [day, month, year].join('-');
};

// convert date to HH:MM AM/PM
const convertDateToStringTime = date => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12;
    const hourString = hour ? hour : 12;
    const minuteString = minutes < 10 ? '0' + minutes : minutes;
    return hourString + ':' + minuteString + ' ' + ampm;
};

export const ApplicantDetailScreen = ({ route }) => {
    const applicant = route?.params?.applicant;
    const [loading, setLoading] = useState(false);
    const [isReview, setIsReview] = useState(false);
    const [date, setDate] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            status: applicant.status,
            message: applicant.message,
        },
    });

    const status = watch('status');

    const onSubmit = async data => {
        try {
            if (!applicant) return;
            if (data.status === Config.APPLY_STATUS.INTERVIEW) {
                data.timeInterview = date;
            }
            setLoading(true);
            await dispatch(sendToApplicantThunk(applicant._id, data));
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (applicant) {
            reset({
                status: applicant.status,
                message: applicant.message,
            });
            if (applicant.timeInterview)
                setDate(new Date(applicant.timeInterview));
        }
    }, []);

    return (
        <Layout paddingB-10>
            {loading && <LoadingScreen />}

            <BackPageButton text="Applicants" />
            <ScrollView>
                <View flex-1 style={styles.container} bg-white br20 marginB-20>
                    <View row centerV>
                        <View>
                            <Image
                                source={Images.mockImg}
                                style={styles.image}
                            />
                        </View>
                        <View flex-1 marginL-10>
                            <Text black font-bold fs14>
                                {cutString(applicant?.user.name, 18)}
                            </Text>
                            <Text black fs12 marginT-5>
                                {cutString(applicant?.vacancy.position, 18)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.divider} bg-grey2 marginT-15 />
                    <View row spread marginT-15>
                        <View flex-1 marginR-20>
                            <PrimaryButton text="See Resume" small />
                        </View>
                        <View flex-1>
                            <PrimaryButton
                                onPress={() => setIsReview(p => !p)}
                                text={isReview ? 'See Details' : 'See Review'}
                                border
                                small
                            />
                        </View>
                    </View>
                    <View style={styles.divider} bg-grey2 marginT-15 />
                    {isReview ? (
                        <ReviewRequirements applicant={applicant} />
                    ) : (
                        <>
                            <Text fs13 marginV-15>
                                Message
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Textarea
                                        containerStyle={
                                            styles.textareaContainer
                                        }
                                        style={styles.textarea}
                                        onChangeText={onChange}
                                        placeholder={'Enter something...'}
                                        placeholderTextColor={Colors.grey}
                                        value={value}
                                    />
                                )}
                                name="message"
                            />
                            {status === Config.APPLY_STATUS.INTERVIEW && (
                                <View row spread marginT-15>
                                    <TouchableOpacity
                                        onPress={() => setOpenDatePicker(true)}
                                        flex-1
                                        centerH
                                        centerV
                                        br100
                                        marginR-20
                                        style={{
                                            borderWidth: 1.5,
                                            borderColor: Colors.grey2,
                                            height: scaleSize(40),
                                        }}
                                    >
                                        <Text fw6 fs14 primary>
                                            {convertDateToStringDay(date)}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setOpenDatePicker(true)}
                                        flex-1
                                        centerH
                                        centerV
                                        br100
                                        style={{
                                            borderWidth: 1.5,
                                            borderColor: Colors.grey2,
                                            height: scaleSize(40),
                                        }}
                                    >
                                        <Text fw6 fs14 primary>
                                            {convertDateToStringTime(date)}
                                        </Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={openDatePicker}
                                        date={date}
                                        onConfirm={date => {
                                            setOpenDatePicker(false);
                                            setDate(date);
                                        }}
                                        onCancel={() => {
                                            setOpenDatePicker(false);
                                        }}
                                    />
                                </View>
                            )}
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <StyledSelectInput
                                        items={[
                                            {
                                                label: 'Rejected',
                                                value: Config.APPLY_STATUS
                                                    .REJECTED,
                                            },
                                            {
                                                label: 'Schedule to Interview',
                                                value: Config.APPLY_STATUS
                                                    .INTERVIEW,
                                            },
                                            {
                                                label: 'Accepted',
                                                value: Config.APPLY_STATUS
                                                    .ACCEPTED,
                                            },
                                        ]}
                                        placeholder="Mark Status as"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                                name="status"
                            />
                        </>
                    )}
                </View>
                {!isReview && (
                    <PrimaryButton
                        disabled={!status}
                        onPress={handleSubmit(onSubmit)}
                        text="Send to Applicant"
                    />
                )}
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.grey2,
        borderWidth: 1,
        padding: scaleSize(15),
    },
    image: {
        width: scaleSize(55),
        height: scaleSize(55),
        borderRadius: 100,
    },
    divider: {
        height: 1,
        width: '100%',
    },
    textareaContainer: {
        maxHeight: '100%',
        borderWidth: 2,
        borderColor: Colors.grey2,
        borderRadius: 10,
        padding: 5,
    },
    textarea: {
        textAlignVertical: 'top',
    },
});
