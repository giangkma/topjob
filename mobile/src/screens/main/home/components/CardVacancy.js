import { Colors } from 'assets/Colors';
import { images } from 'assets/Images';
import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { cutString } from 'utilities';
import { scaleSize } from 'utilities/responsive';
import React from 'react';

export const CardVacancy = () => {
    return (
        <TouchableOpacity>
            <View flex-1 style={styles.container} row centerV>
                <View>
                    <Image source={images.mockImg} style={styles.image} />
                </View>
                <View flex-1>
                    <View row spread marginL-10>
                        <View>
                            <Text black font-bold fs14>
                                {cutString('Frontend Developer', 18)}
                            </Text>
                        </View>
                        <View br100 bg-green2 paddingH-20 center>
                            <Text green1 fw7>
                                Active
                            </Text>
                        </View>
                    </View>
                    <View row spread flex-1 marginL-10 marginT-5 bottom>
                        <View>
                            <Text black fs12>
                                Air BNB
                            </Text>
                            <Text marginT-5 fs12 font-light grey3>
                                VietNam - FullTime
                            </Text>
                        </View>
                        <Text primary fs16 fw7>
                            $4.300
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
    },
});
