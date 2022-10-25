import { Colors } from 'assets';
import React from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import { View } from 'react-native-ui-lib';
import { scaleSize } from 'utilities';

export const Layout = ({ children, bg2, isScroll, paddingTop, ...props }) => {
    return (
        <View
            paddingB-20
            paddingH-18
            style={{
                backgroundColor: Colors.greyChateau,
                paddingTop:
                    paddingTop !== undefined
                        ? paddingTop
                        : Platform.OS === 'ios'
                        ? scaleSize(60)
                        : scaleSize(30),
                marginBottom: Platform.OS === 'ios' ? scaleSize(10) : 0,
            }}
            {...props}
        >
            {isScroll ? (
                <ScrollView width="100%" height="100%">
                    <View width="100%" height="100%">
                        {children}
                    </View>
                </ScrollView>
            ) : (
                <View width="100%" height="100%">
                    {children}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
