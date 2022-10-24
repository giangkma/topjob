import { Colors } from 'assets';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { scaleSize } from 'utilities/responsive';
import React from 'react';
import { Config } from 'config';

const getContentOfApplyStatus = status => {
    switch (status) {
        case Config.APPLY_STATUS.INTERVIEW:
            return {
                text: 'Interview',
                color: Colors.white,
                backgroundColor: Colors.yellow,
            };
        case Config.APPLY_STATUS.ACCEPTED:
            return {
                text: 'Accepted',
                color: Colors.green1,
                backgroundColor: Colors.green2,
            };
        case Config.APPLY_STATUS.REJECTED:
            return {
                text: 'Rejected',
                color: Colors.red,
                backgroundColor: Colors.red2,
            };
        default:
            return {
                text: 'Draft',
                color: Colors.black60,
                backgroundColor: Colors.grey,
            };
    }
};

export const CardStatusApply = ({ status }) => {
    const content = getContentOfApplyStatus(status);

    return (
        <View
            br100
            paddingH-20
            center
            style={{
                backgroundColor: content.backgroundColor,
            }}
        >
            <Text
                style={{
                    color: content.color,
                }}
                fw7
            >
                {content.text}
            </Text>
        </View>
    );
};
