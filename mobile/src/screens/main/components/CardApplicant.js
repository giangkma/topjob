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
import { cutString } from 'utilities';
import { scaleSize } from 'utilities/responsive';
import React from 'react';
import { PrimaryButton } from 'components';
import { navigate } from 'navigators/utils';
import { CardStatusApply } from './CardStatusApply';

export const CardApplicant = ({ data }) => {
    return (
        <TouchableOpacity marginB-10>
            <View flex-1 style={styles.container}>
                <View row centerV spread>
                    <View row centerV flex-1>
                        <View>
                            <Image
                                source={images.mockImg}
                                style={styles.image}
                            />
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
                    <CardStatusApply status={data.status} />
                </View>
                <View style={styles.divider} bg-grey2 marginT-15 />
                <View row spread marginT-15>
                    <View flex-1 marginR-20>
                        <PrimaryButton text="See Resume" small />
                    </View>
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
    divider: {
        height: 1,
        width: '100%',
    },
});
