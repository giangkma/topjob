import { Colors } from 'assets/Colors';
import { scaleSize } from 'utilities/responsive';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField, View, Text } from 'react-native-ui-lib';
import { Search } from 'assets';

export const SearchInput = ({ onChange, value }) => {
    return (
        <View flex-1 style={styles.container}>
            <TextField
                hideUnderline
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                placeholder={'Search'}
            />
            <View style={styles.icon}>
                <Search />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.grey2,
        height: scaleSize(35),
        borderRadius: 100,
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -scaleSize(8) }],
    },
    textInput: {
        backgroundColor: Colors.grey2,
        borderRadius: 100,
        height: scaleSize(35),
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(45),
        color: Colors.black,
    },
});
