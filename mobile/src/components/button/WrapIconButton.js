import { Colors } from 'assets/Colors';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-ui-lib';
import { scaleSize } from 'utilities';
import React from 'react';

export const WrapIconButton = ({ icon, onPress, ...props }) => {
    if (!onPress) return <View style={styles.icon}>{icon}</View>;
    return (
        <TouchableOpacity onPress={onPress}>
            <View bg-aliceBlue {...props} style={styles.icon}>
                {icon}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        borderRadius: scaleSize(8),
        paddingHorizontal: scaleSize(10),
        paddingVertical: scaleSize(8),
        minHeight: scaleSize(35),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
