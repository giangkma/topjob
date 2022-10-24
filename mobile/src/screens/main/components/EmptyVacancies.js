import { images } from 'assets/Images';
import { PrimaryButton } from 'components';
import { navigate } from 'navigators/utils';
import { StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';
import React from 'react';

export const EmptyVacancies = () => {
    return (
        <>
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
                onPress={() => navigate('CreateVacancy')}
            />
        </>
    );
};

const styles = StyleSheet.create({
    imageEmpty: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
});
