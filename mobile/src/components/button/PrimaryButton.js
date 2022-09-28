import { Colors } from 'assets/Colors';
import { scaleSize } from 'utilities';
import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, TouchableOpacity } from 'react-native-ui-lib';

export const PrimaryButton = ({
    text,
    onPress,
    loading,
    style,
    border,
    small,
    disabled,
    fontSize,
    ...props
}) => {
    const fs = fontSize || (small ? 15 : 17);
    return (
        <TouchableOpacity
            {...props}
            style={style}
            disabled={disabled}
            onPress={onPress}
        >
            {border ? (
                <View
                    style={[
                        small ? styles.smallButton : styles.button,
                        styles.borderButton,
                    ]}
                >
                    <View flex centerV centerH>
                        {loading ? (
                            <ActivityIndicator color={Colors.white} />
                        ) : (
                            <Text
                                primary
                                fw8
                                font-extraBold
                                style={{ fontSize: fs }}
                            >
                                {text}
                            </Text>
                        )}
                    </View>
                </View>
            ) : (
                <LinearGradient
                    colors={
                        disabled
                            ? ['#676767', '#676767']
                            : ['#367bff', '#367bff']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={small ? styles.smallButton : styles.button}
                >
                    <View flex centerV centerH>
                        {loading ? (
                            <ActivityIndicator color={Colors.white} />
                        ) : (
                            <Text
                                white={!disabled}
                                white50={disabled}
                                fw8
                                font-extraBold
                                style={{ fontSize: fs }}
                            >
                                {text}
                            </Text>
                        )}
                    </View>
                </LinearGradient>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backdropFilter: 'blur(114px)',
        height: scaleSize(43),
        borderRadius: 30,
        paddingHorizontal: 30,
    },
    smallButton: {
        backdropFilter: 'blur(114px)',
        height: scaleSize(35),
        borderRadius: 30,
        paddingHorizontal: 20,
    },
    borderButton: {
        borderWidth: 2,
        borderColor: Colors.primary,
    },
});
