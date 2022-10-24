import { vacancyApi } from 'apis';
import { CheckBlue } from 'assets';
import { Colors } from 'assets';
import { images } from 'assets/Images';
import { LoadingScreen, PrimaryButton } from 'components';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { postJobVacancyThunk } from 'store/auth';
import { convertToSalary, cutString, scaleSize } from 'utilities';
import React from 'react';
import { navigate } from 'navigators/utils';

const STATUS = {
    pending: 'PENDING',
    success: 'SUCCESS',
    error: 'ERROR',
};

export const Step4CreateVacancy = ({ vacancy, onResetFormVacancy }) => {
    const [status, setStatus] = useState(STATUS.pending);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onPostJobVacancy = async () => {
        try {
            setLoading(true);
            console.log('vacancy', vacancy);
            await dispatch(postJobVacancyThunk(vacancy));
            setStatus(STATUS.success);
        } catch (error) {
            setStatus(STATUS.error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <View flex spread height="100%">
            {loading && <LoadingScreen />}
            <ScrollView>
                <View flex-1 style={styles.container} row centerV bg-white br20>
                    <View>
                        <Image source={images.mockImg} style={styles.image} />
                    </View>
                    <View marginL-15>
                        <Text black font-bold fs14>
                            {cutString(vacancy.position, 28)}
                        </Text>
                        <Text marginT-5 black fs12>
                            Air BNB
                        </Text>
                    </View>
                </View>
                {status === STATUS.success ? (
                    <View center>
                        <Image
                            source={images.postJobSuccess}
                            style={{
                                width: '100%',
                                height: scaleSize(200),
                                resizeMode: 'contain',
                            }}
                        />
                        <Text primary font-extraBold fs20>
                            Job Vacancy Posted!
                        </Text>
                        <Text center marginT-15 grey3>
                            Now you can see all the applier CV/Resume and invite
                            them to th next step.
                        </Text>
                    </View>
                ) : status === STATUS.error ? (
                    <View center>
                        <Image
                            source={images.postJobFail}
                            style={{
                                width: '100%',
                                height: scaleSize(200),
                                resizeMode: 'contain',
                            }}
                        />
                        <Text red3 font-extraBold fs20>
                            Oops, Failed to post
                        </Text>
                        <Text center marginT-15 grey3>
                            Please make sure that your internet connection is
                            active and stable, then press "Try Again"
                        </Text>
                    </View>
                ) : (
                    <>
                        <View width="100%" height={1} bg-grey2 marginT-20 />
                        <View row spread marginT-15 centerH>
                            <Text black fs13>
                                Salary
                            </Text>
                            <Text primary fs14 fw7>
                                ${convertToSalary(vacancy.salary)}
                            </Text>
                        </View>
                        <View row spread marginT-7 centerH>
                            <Text black fs13>
                                Type
                            </Text>
                            <Text primary fs14 fw7>
                                {vacancy.type}
                            </Text>
                        </View>
                        <View row spread marginT-7 centerH>
                            <Text black fs13>
                                Location
                            </Text>
                            <Text primary fs14 fw7>
                                {vacancy.location}
                            </Text>
                        </View>
                        <View width="100%" height={1} bg-grey2 marginT-20 />
                        <Text black fw7 fs15 marginT-20>
                            Requirements
                        </Text>
                        {vacancy.requirements.map(value => (
                            <View style={{ position: 'relative' }} paddingT-8>
                                <TouchableOpacity
                                    style={styles.box}
                                    bg-grey4
                                    padding-10
                                    br10
                                    row
                                >
                                    <View style={styles.icon}>
                                        <CheckBlue />
                                    </View>
                                    <Text marginL-40>{value}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <Text black fw7 fs15 marginT-20>
                            benefits
                        </Text>
                        {vacancy.benefits.map(value => (
                            <View style={{ position: 'relative' }} paddingT-8>
                                <TouchableOpacity
                                    style={styles.box}
                                    bg-grey4
                                    padding-10
                                    br10
                                    row
                                >
                                    <View style={styles.icon}>
                                        <CheckBlue />
                                    </View>
                                    <Text marginL-40>{value}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
            {status === STATUS.success ? (
                <>
                    <PrimaryButton
                        onPress={() => navigate('Vacancies')}
                        marginB-10
                        text="Go to Vacancies"
                    />
                    <PrimaryButton
                        onPress={onResetFormVacancy}
                        marginB-10
                        text="Post Another Vacancy"
                        border
                    />
                </>
            ) : status === STATUS.error ? (
                <>
                    <PrimaryButton
                        onPress={onPostJobVacancy}
                        marginB-10
                        text="Try Again"
                    />
                    <PrimaryButton
                        onPress={() => navigate('Home')}
                        marginB-10
                        text="Back to Home"
                        border
                    />
                </>
            ) : (
                <PrimaryButton
                    onPress={onPostJobVacancy}
                    marginB-10
                    paddingT-20
                    text="Post Job Vacancy"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.grey2,
        borderWidth: 1,
        padding: scaleSize(15),
        marginHorizontal: 6,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
        shadowColor: Colors.grey3,
    },
    image: {
        width: scaleSize(55),
        height: scaleSize(55),
    },
    box: {
        borderWidth: 1.2,
        borderColor: Colors.grey4,
    },
    icon: {
        position: 'absolute',
        left: scaleSize(15),
        top: '50%',
        zIndex: 1,
    },
});
