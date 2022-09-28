import { Chevronleft } from 'assets';
import { Colors } from 'assets/Colors';
import { navigate } from 'navigators/utils';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { scaleSize } from 'utilities';
import React from 'react';

export const BackPageButton = ({ text, navigateTo, onPress = () => {} }) => {
    return (
        <View style={styles.textHeader} marginB-30>
            <TouchableOpacity
                onPress={() => (navigateTo ? navigate(navigateTo) : onPress())}
            >
                <View style={styles.buttonPrev}>
                    <Chevronleft />
                </View>
            </TouchableOpacity>
            <View marginL-16>
                <Text black fs18 fw8 font-black>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonPrev: {
        backgroundColor: Colors.aliceBlue,
        width: scaleSize(28),
        height: scaleSize(26),
        borderRadius: scaleSize(3),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
