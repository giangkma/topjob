import { Colors } from 'assets';
import { scaleSize } from 'utilities/responsive';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField, View, Text } from 'react-native-ui-lib';

export const StyledTextInput = ({
    placeholder,
    onChange,
    value,
    onBlur,
    icon,
    type,
    error,
    required,
}) => {
    return (
        <View marginT-12>
            {placeholder && (
                <View marginB-10 style={styles.label}>
                    <Text fw8>
                        {placeholder}
                        {required && <Text red> *</Text>}
                    </Text>
                </View>
            )}
            <View style={styles.container}>
                <TextField
                    secureTextEntry={type === 'password'}
                    hideUnderline
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder={placeholder}
                />
            </View>
            {error && (
                <Text error marginL-22 marginT-2>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.aluminiumGrey,
        height: scaleSize(43),
        borderRadius: 100,
    },
    label: {
        paddingLeft: scaleSize(20),
    },
    textInput: {
        backgroundColor: Colors.white,
        borderRadius: 100,
        height: scaleSize(43),
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20),
        color: Colors.black,
        borderWidth: 1.5,
        borderColor: Colors.grey4,
    },
});
