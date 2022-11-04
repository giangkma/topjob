import { Colors } from 'assets';
import { images } from 'assets/Images';
import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { convertToSalary, cutString, getInitials } from 'utilities';
import { scaleSize } from 'utilities/responsive';
import React from 'react';
import { navigate } from 'navigators/utils';
import { Config } from 'config';
import { useSelector } from 'react-redux';
import { getOrganization } from 'store/auth';
import { useGetLogoVacancy } from 'hooks';

const displayType = type => {
    switch (type) {
        case Config.VACANCY_TYPES.FULL_TIME:
            return 'Full Time';
        case Config.VACANCY_TYPES.PART_TIME:
            return 'Part Time';
        case Config.VACANCY_TYPES.FREELANCE:
            return 'Freelance';
        default:
            return '';
    }
};

export const CardVacancy = ({ data, navigateTo }) => {
    const isActive = data.status == 'active';
    const organization = useSelector(getOrganization);

    const imageVacancy = useGetLogoVacancy(data);

    return (
        <TouchableOpacity
            marginB-5
            onPress={() =>
                navigate(navigateTo || 'DetailVacancy', { vacancy: data })
            }
        >
            <View flex-1 style={styles.container} row centerV>
                <View>
                    {imageVacancy ? (
                        <Image source={imageVacancy} style={styles.image} />
                    ) : (
                        <View row centerH centerV br10 style={styles.boxName}>
                            <Text fs20>{getInitials(data.position)}</Text>
                        </View>
                    )}
                </View>
                <View flex-1>
                    <View row spread marginL-10>
                        <View>
                            <Text black font-bold fs14>
                                {cutString(data.position, 18)}
                            </Text>
                        </View>
                        <View
                            br100
                            paddingH-20
                            center
                            style={{
                                backgroundColor: isActive
                                    ? Colors.green2
                                    : Colors.grey,
                            }}
                        >
                            <Text
                                style={{
                                    color: isActive
                                        ? Colors.green1
                                        : Colors.black60,
                                }}
                                fw7
                            >
                                {isActive ? 'Active' : 'Inactive'}
                            </Text>
                        </View>
                    </View>
                    <View row spread flex-1 marginL-10 marginT-5 bottom>
                        <View>
                            <Text black fs12>
                                {data.organization?.name}
                            </Text>
                            <Text marginT-5 fs12 font-light grey3>
                                {data.location} - {displayType(data.type)}
                            </Text>
                        </View>
                        <Text primary fs16 fw7>
                            ${convertToSalary(data?.salary)}
                        </Text>
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
        borderRadius: 10,
    },
    boxName: {
        backgroundColor: Colors.grey2,
        width: scaleSize(55),
        height: scaleSize(55),
    },
});
