import {
    BackPageButton,
    PrimaryButton,
    SearchInput,
    WrapIconButton,
} from 'components';
import { ScrollView, StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { Layout } from 'screens';
import { getApplies } from 'store/auth';
import {
    CardApplicant,
    EmptyVacancies,
    MainTabsLayout,
} from 'screens/main/components';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { images } from 'assets/Images';
import { LogoIcon } from 'assets';

const menu = ['All', 'Draft', 'Interview', 'Rejected', 'Accepted'];

export const ApplicantListScreen = () => {
    const applies = useSelector(getApplies);
    const [activeTab, setActiveTab] = useState(menu[0]);
    const [search, setSearch] = useState('');

    const [appliesDisplay, setAppliesDisplay] = useState(applies);
    const debouncedSearch = useDebounce(search, 500);

    const filterApplies = useCallback(
        status => {
            setActiveTab(status);
            if (status == menu[0]) return setAppliesDisplay(applies);
            const appliesFilter = applies?.filter(
                vacancy => vacancy.status === status.toLowerCase(),
            );
            setAppliesDisplay(appliesFilter);
        },
        [applies],
    );

    useFocusEffect(
        useCallback(() => {
            setActiveTab(menu[0]);
            setAppliesDisplay(applies);
        }, [applies]),
    );

    useEffect(() => {
        if (debouncedSearch) {
            const filter = applies?.filter(
                item =>
                    item.vacancy.position
                        .toLowerCase()
                        .includes(debouncedSearch.toLowerCase()) ||
                    item.user.name
                        .toLowerCase()
                        .includes(debouncedSearch.toLowerCase()),
            );
            setAppliesDisplay(filter);
        } else {
            setAppliesDisplay(applies);
        }
    }, [debouncedSearch]);

    return (
        <MainTabsLayout>
            <View row centerV paddingB-15>
                <LogoIcon />
                <Text marginL-10 black fs17 fw7>
                    Applicants
                </Text>
            </View>
            {applies && applies.length > 0 ? (
                <>
                    <View marginT-10 width="100%" row centerV spread>
                        <SearchInput onChange={text => setSearch(text)} />
                    </View>
                    <ScrollView width="100%" height="100%">
                        <View
                            row
                            marginT-15
                            marginB-20
                            style={{ flexWrap: 'wrap' }}
                        >
                            {menu.map(item => {
                                const isAcive = activeTab === item;
                                return (
                                    <PrimaryButton
                                        onPress={() => filterApplies(item)}
                                        marginR-5
                                        marginT-5
                                        text={item}
                                        small
                                        fontSize={12}
                                        border={!isAcive}
                                    />
                                );
                            })}
                        </View>
                        {appliesDisplay.map((item, index) => (
                            <CardApplicant key={index} data={item} />
                        ))}
                    </ScrollView>
                </>
            ) : (
                <>
                    <Image source={images.empty} style={styles.imageEmpty} />
                    <Text center marginT-20 primary fs20 fw7>
                        Empty
                    </Text>
                    <Text center marginT-15 black fs14 fw6>
                        Please wait the applicants apply for your vacancies
                    </Text>
                </>
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
