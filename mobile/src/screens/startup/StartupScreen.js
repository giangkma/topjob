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
import { Colors } from 'assets';
import { Config } from 'config';
import { LoadingScreen, ProfileForm } from 'components';
import { accountApi, organizationApi } from 'apis';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/auth';

export const StartupScreen = () => {
    const [selectedType, setSelectedType] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async data => {
        try {
            setLoading(true);
            data.establishedDate = new Date();
            await organizationApi.postCreate(data);
            const user = await accountApi.putUpdateProfile({
                role: selectedType,
            });
            dispatch(setUser(user));
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
                <ProfileForm
                    back
                    onSubmit={onSubmit}
                    title="Organization Profile"
                />
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
                paddingT-30
                paddingB-50
                flex
                spread
            >
                <View center>
                    <PersonCircle3 />
                    <Text fw7 fs18 marginV-20>
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
                            setSelectedType(Config.ACCOUNT_TYPE.EMPLOYEE)
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
                            setSelectedType(Config.ACCOUNT_TYPE.ADMIN)
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
