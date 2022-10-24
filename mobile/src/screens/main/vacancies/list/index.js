import { LogoIcon, Plus } from 'assets';
import { images } from 'assets/Images';
import { PrimaryButton, SearchInput, WrapIconButton } from 'components';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { Layout } from 'screens';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getVacancies } from 'store/auth';
import {
    CardVacancy,
    EmptyVacancies,
    MainTabsLayout,
} from 'screens/main/components';
import { useDebounce } from 'hooks';
import { navigate } from 'navigators/utils';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const menu = ['All vacancies', 'Active', 'Inactive'];

export const VacanciesScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(menu[0]);
    const [search, setSearch] = useState('');
    const vacancies = useSelector(getVacancies);
    const [vacanciesDisplay, setVacanciesDisplay] = useState(vacancies);

    const onNavigateToCreateVacancy = () => {
        navigation.navigate('CreateVacancy');
    };

    const debouncedSearch = useDebounce(search, 500);

    useFocusEffect(
        useCallback(() => {
            if (debouncedSearch) {
                const filter = vacancies.filter(item =>
                    item.position
                        .toLowerCase()
                        .includes(debouncedSearch.toLowerCase()),
                );
                setVacanciesDisplay(filter);
            } else {
                setVacanciesDisplay(vacancies);
            }
        }, [debouncedSearch]),
    );

    useFocusEffect(
        useCallback(() => {
            if (activeTab == menu[0]) return setVacanciesDisplay(vacancies);
            const vacanciesFilter = vacancies.filter(
                vacancy => vacancy.status === activeTab.toLowerCase(),
            );
            setVacanciesDisplay(vacanciesFilter);
        }, [activeTab]),
    );

    return (
        <MainTabsLayout>
            <View width="100%" row centerV spread paddingB-15>
                <View row centerV>
                    <LogoIcon />
                    <Text marginL-10 black fs17 fw7>
                        Vacancies
                    </Text>
                </View>
                <WrapIconButton
                    onPress={() => navigate('CreateVacancy')}
                    icon={<Plus />}
                />
            </View>

            {vacancies.length > 0 ? (
                <>
                    <View marginT-10 paddingB-15>
                        <SearchInput onChange={text => setSearch(text)} />
                    </View>
                    <View row marginT-10 marginB-20>
                        {['All vacancies', 'Active', 'Inactive'].map(item => {
                            const isAcive = activeTab === item;
                            return (
                                <PrimaryButton
                                    onPress={() => setActiveTab(item)}
                                    marginR-8
                                    text={item}
                                    small
                                    fontSize={13}
                                    border={!isAcive}
                                />
                            );
                        })}
                    </View>
                    {vacanciesDisplay.map((item, index) => (
                        <CardVacancy data={item} />
                    ))}
                </>
            ) : (
                <EmptyVacancies />
            )}
        </MainTabsLayout>
    );
};

const styles = StyleSheet.create({
    imageEmpty: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
});
