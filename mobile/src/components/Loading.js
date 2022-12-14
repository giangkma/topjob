import { Colors } from 'assets';
import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native-ui-lib';

export const LoadingScreen = ({ text }) => {
    return (
        <Spinner
            visible={true}
            textContent={text}
            textStyle={styles.spinnerTextStyle}
            overlayColor={Colors.black60}
        />
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: Colors.white,
    },
});
