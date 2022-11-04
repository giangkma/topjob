import { Colors } from 'assets';
import { images } from 'assets/Images';
import { StyleSheet } from 'react-native';
import {
    Dividers,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native-ui-lib';
import { cutString, getInitials } from 'utilities';
import { scaleSize } from 'utilities/responsive';
import React from 'react';
import { PrimaryButton } from 'components';
import { navigate } from 'navigators/utils';
import { CardStatusApply } from './CardStatusApply';

export const CardApplicant = ({ data }) => {
    const requirementsLength = data.vacancy.requirements.length;
    const requirementsAccept = data.requirements.length;

    return (
        <TouchableOpacity marginB-10>
            <View flex-1 style={styles.container}>
                <View row centerV spread>
                    <View row centerV flex-1>
                        <View>
                            {data.user.avatar ? (
                                <Image
                                    source={{ uri: data.user.avatar }}
                                    style={styles.image}
                                />
                            ) : (
                                <View
                                    row
                                    centerH
                                    centerV
                                    br100
                                    style={styles.boxName}
                                >
                                    <Text fs20>
                                        {getInitials(data.user.name)}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <View flex-1 marginL-10>
                            <Text black font-bold fs14>
                                {cutString(data.user.name, 18)}
                            </Text>
                            <Text black fs12 marginT-5>
                                {cutString(data.vacancy.position, 18)}
                            </Text>
                        </View>
                    </View>
                    <View centerH right>
                        <Text marginB-5 fs14 red>
                            {requirementsAccept}/{requirementsLength}
                        </Text>
                        <CardStatusApply status={data.status} />
                    </View>
                </View>
                <View style={styles.divider} bg-grey2 marginT-15 />
                <View row spread marginT-15>
                    {data.user.resume && (
                        <View flex-1 marginR-20>
                            <PrimaryButton
                                text="See Resume"
                                onPress={() =>
                                    navigate('SeeResume', {
                                        uri: data.user.resume,
                                    })
                                }
                                small
                            />
                        </View>
                    )}
                    <View flex-1>
                        <PrimaryButton
                            onPress={() =>
                                navigate('DetailApplicant', { applicant: data })
                            }
                            text="See Details"
                            border
                            small
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.grey2,
        borderWidth: 1,
        borderRadius: 25,
        padding: scaleSize(15),
        backgroundColor: Colors.white,
    },
    image: {
        width: scaleSize(55),
        height: scaleSize(55),
        borderRadius: 100,
    },
    boxName: {
        backgroundColor: Colors.grey2,
        width: scaleSize(55),
        height: scaleSize(55),
    },
    divider: {
        height: 1,
        width: '100%',
    },
});
