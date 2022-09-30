import { accountApi, topicApi, vacancyApi } from 'apis';
import { LogoIcon, Notify, Sort } from 'assets';
import { SearchInput, WrapIconButton } from 'components';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'screens';
import {
    getOrganization,
    getProfileThunk,
    onLogout,
    setUser,
} from 'store/auth';
import { setTopics } from 'store/flashCards';
import { showAlert } from 'utilities';
import { CardRecentApplied, CardVacancy } from './components';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks';

export const HomeScreen = ({ navigation }) => {
    const [vacancies, setVacancies] = useState([]);
    const { organization } = useAuth();
    const dispatch = useDispatch();

    const getInit = async () => {
        try {
            console.log('organization', organization);
            if (!organization) return;
            await dispatch(getProfileThunk());
            console.log(organization._id);
            const vacanciesData = await vacancyApi.getVacanciesOfOrganization(
                organization._id,
            );
            console.log('vacanciesData', vacanciesData);
            setVacancies(vacanciesData);
        } catch (error) {
            showAlert(error.message);
        }
    };

    const onClickLogout = () => {
        dispatch(onLogout());
    };

    useEffect(() => {
        getInit();
    }, []);

    return (
        <Layout bg2 isScroll={true}>
            <View width="100%" row centerV spread paddingB-15>
                <View row centerV>
                    <LogoIcon />
                    <Text marginL-10 black fs17 fw7>
                        Hello, {organization?.name}!
                    </Text>
                </View>
                <WrapIconButton onPress={onClickLogout} icon={<Notify />} />
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
                {vacancies.map((item, index) => (
                    <CardVacancy />
                ))}
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
