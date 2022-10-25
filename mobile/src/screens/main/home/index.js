import { ArrowDown, LogoIcon, Notify, Sort } from 'assets';
import {
    LoadingScreen,
    PrimaryButton,
    SearchInput,
    WrapIconButton,
} from 'components';
import { useAuth } from 'hooks';
import { navigate } from 'navigators/utils';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, Image } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'screens';
import {
    fetchAppliesThunk,
    fetchVacanciesThunk,
    getApplies,
    getProfileThunk,
    getVacancies,
    onLogout,
} from 'store/auth';
import { showAlert } from 'utilities';
import {
    CardVacancy,
    CardApplicant,
    ModalSelectOrganization,
    MainTabsLayout,
    EmptyVacancies,
} from '../components';
import React, { useEffect, useMemo } from 'react';
import { Config } from 'config';
import { useState } from 'react';

export const HomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const vacancies = useSelector(getVacancies);
    const applies = useSelector(getApplies);
    const [isChangeCompany, setIsChangeCompany] = useState(false);

    const recentApplies = useMemo(() => {
        return applies
            ?.filter(apply => apply.status === Config.APPLY_STATUS.DRART)
            .slice(0, 5);
    }, [applies]);

    const { organization } = useAuth();
    const dispatch = useDispatch();

    const getInit = async () => {
        try {
            setLoading(true);
            await dispatch(getProfileThunk());
            await dispatch(fetchVacanciesThunk());
            await dispatch(fetchAppliesThunk());
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onClickLogout = () => {
        dispatch(onLogout());
    };

    useEffect(() => {
        getInit();
    }, []);

    return (
        <MainTabsLayout>
            {loading && <LoadingScreen />}
            <ModalSelectOrganization
                visible={isChangeCompany}
                onClose={() => setIsChangeCompany(false)}
            />
            <View width="100%" row centerV spread paddingB-15>
                <View row centerV>
                    <LogoIcon />
                    <TouchableOpacity
                        row
                        centerV
                        onPress={() => setIsChangeCompany(true)}
                    >
                        <Text marginL-10 black fs17 fw7 marginR-5>
                            Hello, {organization?.name}!
                        </Text>
                        <ArrowDown />
                    </TouchableOpacity>
                </View>
                <WrapIconButton onPress={onClickLogout} icon={<Notify />} />
            </View>
            {vacancies?.length > 0 && (
                <View width="100%" marginT-10 row centerV spread paddingB-15>
                    <SearchInput />
                    <View marginL-20>
                        <WrapIconButton icon={<Sort />} />
                    </View>
                </View>
            )}
            <ScrollView width="100%" height="100%">
                {vacancies && vacancies.length > 0 ? (
                    <>
                        <View marginV-20 row centerV spread>
                            <Text black fs17 fw7>
                                My Vacancies
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigate('Vacancies')}
                            >
                                <Text primary fs14 fw7>
                                    See all
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {vacancies.map((item, index) => (
                            <CardVacancy key={index} data={item} />
                        ))}
                        {recentApplies && recentApplies.length > 0 && (
                            <>
                                <View marginV-20 row centerV spread>
                                    <Text black fs17 fw7>
                                        Recent People Applied
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => navigate('Applicants')}
                                    >
                                        <Text primary fs14 fw7>
                                            See all
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {recentApplies.map((item, index) => (
                                    <CardApplicant key={index} data={item} />
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <EmptyVacancies />
                )}
            </ScrollView>
        </MainTabsLayout>
    );
};
