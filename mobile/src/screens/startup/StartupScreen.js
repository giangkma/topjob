import { Layout } from 'components/layouts/Layout';
import { StyleSheet } from 'react-native';
import {
    ColorSliderGroup,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native-ui-lib';
import { Logo } from 'screens';
import React, { useState } from 'react';
import { Images, PersonCircle1, PersonCircle2, PersonCircle3 } from 'assets';
import { scaleSize, showAlert } from 'utilities';
import { Colors } from 'assets/Colors';
import { Config } from 'config';
import { LoadingScreen, ProfileForm } from 'components';

export const StartupScreen = () => {
    const [selectedType, setSelectedType] = useState();
    const [loading, setLoading] = useState(false);

    const onSubmit = async data => {
        try {
            setLoading(true);
        } catch (error) {
            showAlert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (selectedType) {
        return (
            <>
                {loading && <LoadingScreen />}
                <ProfileForm onSubmit={onSubmit} title="Organization Profile" />
            </>
        );
    }
    return (
        <>
            <Image style={styles.logo} source={Images.logo} />
            <View
                bg-white
                style={styles.box}
                centerH
                paddingT-50
                paddingB-50
                flex
                spread
            >
                <View center>
                    <PersonCircle3 />
                    <Text fw7 fs18 marginT-20>
                        What are you looking for?
                    </Text>
                </View>
                <View row spread paddingH-30 width="100%">
                    <TouchableOpacity
                        flex-1
                        center
                        style={styles.smallBox}
                        br20
                        paddingV-20
                        onPress={() =>
                            setSelectedType(Config.ACCOUNT_TYPE.human_resources)
                        }
                    >
                        <PersonCircle1 />
                        <Text marginT-10>I want a job</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        flex-1
                        center
                        marginL-15
                        style={styles.smallBox}
                        br20
                        paddingV-20
                        onPress={() =>
                            setSelectedType(Config.ACCOUNT_TYPE.employer)
                        }
                    >
                        <PersonCircle2 />
                        <Text marginT-10>I want an emplyee</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: scaleSize(300),
        resizeMode: 'contain',
    },
    box: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    smallBox: {
        borderWidth: 2,
        borderColor: Colors.grey2,
    },
});
