import { ArrowLeft, Colors } from 'assets';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import WebView from 'react-native-webview';

export const ResumeScreen = ({ navigation, route }) => {
    const { uri } = route?.params;

    if (!uri) return navigation.goBack();
    return (
        <>
            <View style={{ backgroundColor: Colors.black, height: 50 }}></View>
            <WebView
                source={{
                    uri,
                }}
            />
            <TouchableOpacity
                row
                centerV
                centerH
                paddingV-10
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: Colors.aliceBlue }}
                paddingB-40
            >
                <ArrowLeft width={18} />
                <Text fs14 marginL-8>
                    Back
                </Text>
            </TouchableOpacity>
        </>
    );
};
