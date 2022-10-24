import { Chevronleft } from 'assets';
import { Colors } from 'assets';
import { goBack, navigate } from 'navigators/utils';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { scaleSize } from 'utilities';
import React from 'react';

export const BackPageButton = ({ text, navigateTo, elementRight, onPress }) => {
    return (
        <View row spread marginB-30>
            <View row centerV>
                <TouchableOpacity
                    onPress={() =>
                        navigateTo
                            ? navigate(navigateTo)
                            : onPress
                            ? onPress()
                            : goBack()
                    }
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
            {elementRight && elementRight}
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
});
