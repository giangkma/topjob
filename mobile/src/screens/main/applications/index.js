import { LogoIcon, Plus } from 'assets';
import { images } from 'assets/Images';
import { PrimaryButton, SearchInput, WrapIconButton } from 'components';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { Layout } from 'screens';
import React, { useEffect, useState } from 'react';

const menu = ['All vacancies', 'Active', 'Inactive'];

export const ApplicationsScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(menu[0]);

    const onNavigateToCreateVacancy = () => {
        navigation.navigate('CreateVacancy');
    };

    return (
        <Layout isScroll={true}>
            <View width="100%" row centerV spread paddingB-15>
                <View row centerV>
                    <LogoIcon />
                    <Text marginL-10 black fs17 fw7>
                        Applications
                    </Text>
                </View>
                <WrapIconButton onPress={() => {}} icon={<Plus />} />
            </View>
            <View marginT-10 paddingB-15>
                <SearchInput />
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
            <Image source={images.empty} style={styles.imageEmpty} />
            <Text center marginT-20 primary fs20 fw7>
                Empty
            </Text>
            <Text center marginT-15 black fs14 fw6>
                Create a job vacancy for your company and start find new hight
                quality employee
            </Text>
            <PrimaryButton
                text="Create Vacancies Now"
                marginT-40
                small
                onPress={onNavigateToCreateVacancy}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    imageEmpty: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
});
