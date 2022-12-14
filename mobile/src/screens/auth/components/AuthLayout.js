import { Colors } from 'assets';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Layout, Logo } from 'screens';
import { SocialButtons } from '.';

export const AuthLayout = ({ children, text }) => {
    return (
        <Layout isScroll>
            <View paddingB-80>
                <View row center>
                    <Logo />
                </View>
                <View>
                    <View paddingH-8 paddingB-22>
                        <Text black center fs19 fw9 font-black>
                            {text}
                        </Text>
                    </View>
                    {children}
                    <SocialButtons text={text} />
                </View>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    divider1: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.white,
    },
    divider2: {
        height: 5,
        width: '100%',
        backgroundColor: `${Colors.white}25`,
    },
});
