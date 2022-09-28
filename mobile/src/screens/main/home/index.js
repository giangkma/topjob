import { accountApi, topicApi, wordApi } from 'apis';
import { Icons, Images, LogoIcon, Menu, Notify, Search, Sort } from 'assets';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'screens';
import { getFavoriteList, setFavoriteList, setUser } from 'store/auth';
import { setTopics } from 'store/flashCards';
import { scaleSize, showAlert } from 'utilities';
import { SearchInput, StyledTextInput, WrapIconButton } from 'components';
import { CardRecentApplied, CardVacancy } from './components';

export const HomeScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { data, total } = useSelector(getFavoriteList);
    const dispatch = useDispatch();

    const getTopics = async () => {
        try {
            const res = await topicApi.getTopics();
            dispatch(setTopics(res));
        } catch (error) {
            showAlert(error.message);
        }
    };

    const getProfile = async () => {
        try {
            const { user } = await accountApi.getUserInfo();
            const { email } = await accountApi.getUserProfile();
            dispatch(
                setUser({
                    ...user,
                    email,
                }),
            );
        } catch (error) {
            showAlert(error.message);
        }
    };

    const getFavoriteWords = async () => {
        try {
            if (data && total !== 0) return;
            const { packList, total: t } = await wordApi.getUserFavoriteList();
            dispatch(setFavoriteList({ packList, total: t }));
        } catch (error) {
            showAlert(error.message);
        }
    };

    useEffect(() => {
        // getTopics();
        // getProfile();
        // getFavoriteWords();
    }, []);
    return (
        <Layout bg2 isScroll={true}>
            <View width="100%" row centerV spread paddingB-15>
                <View row centerV>
                    <LogoIcon />
                    <Text marginL-10 black fs17 fw7>
                        Hello, Admin!
                    </Text>
                </View>
                <WrapIconButton icon={<Notify />} />
            </View>
            <View width="100%" marginT-10 row centerV spread paddingB-15>
                <SearchInput />
                <View marginL-20>
                    <WrapIconButton icon={<Sort />} />
                </View>
            </View>
            <ScrollView width="100%" height="100%">
                <View marginV-20 row centerV spread>
                    <Text black fs17 fw7>
                        My Vacancies
                    </Text>
                    <TouchableOpacity>
                        <Text primary fs14 fw7>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
                <CardVacancy />
                <View marginV-20 row centerV spread>
                    <Text black fs17 fw7>
                        Recent People Applied
                    </Text>
                    <TouchableOpacity>
                        <Text primary fs14 fw7>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
                <CardRecentApplied />
            </ScrollView>
        </Layout>
    );
};
