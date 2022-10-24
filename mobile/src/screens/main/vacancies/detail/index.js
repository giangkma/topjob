import { Colors } from 'assets';
import { images } from 'assets/Images';
import { BackPageButton, Layout, LoadingScreen } from 'components';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { cutString, scaleSize } from 'utilities';
import React from 'react';
import { navigate } from 'navigators/utils';
import { useEffect } from 'react';
import { applyApi } from 'apis';
import { useCallback } from 'react';
import { CardApplicant, CardVacancy } from 'screens/main/components';
import { useFocusEffect } from '@react-navigation/native';

export const DetailVacancyScreen = ({ route, navigation }) => {
    const vacancy = route?.params?.vacancy;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [applicants, setApplicants] = useState([]);

    const getApplicantsOfVacancy = useCallback(async () => {
        try {
            if (!vacancy) return;
            setLoading(true);
            const response = await applyApi.getAllApplyByVacancyId(vacancy._id);
            setApplicants(response);
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    }, [vacancy._id]);

    useFocusEffect(
        useCallback(() => {
            getApplicantsOfVacancy();
        }, [getApplicantsOfVacancy]),
    );

    return (
        <Layout paddingB-10>
            {loading && <LoadingScreen />}
            <BackPageButton text="Vacancies" />
            {vacancy && (
                <ScrollView>
                    <CardVacancy navigateTo="CreateVacancy" data={vacancy} />
                    <View marginH-10 marginV-20>
                        <Text fs14 marginB-20>
                            Applicants
                        </Text>
                        {applicants && applicants.length > 0 ? (
                            applicants.map((item, index) => (
                                <CardApplicant key={index} data={item} />
                            ))
                        ) : (
                            <>
                                <Image
                                    source={images.empty}
                                    style={styles.imageEmpty}
                                />
                                <Text center marginT-20 primary fs20 fw7>
                                    Empty
                                </Text>
                            </>
                        )}
                    </View>
                </ScrollView>
            )}
        </Layout>
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
    imageEmpty: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
});
