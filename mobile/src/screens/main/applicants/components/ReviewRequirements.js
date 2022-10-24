import { Text, View } from 'react-native-ui-lib';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Check, CloseRed, Colors } from 'assets';

export const ReviewRequirements = ({ applicant }) => {
    const vacancyRequirements = applicant.vacancy.requirements;
    const applicantRequirements = applicant.requirements;

    return (
        <View>
            <Text fs13 marginV-15>
                Requirements are met :&nbsp;
                {applicantRequirements.length} /&nbsp;
                {vacancyRequirements.length}
            </Text>
            {vacancyRequirements.map((requirement, index) => {
                const isRequirementMet =
                    applicantRequirements.includes(requirement);
                return (
                    <View row spread centerV marginB-6>
                        {isRequirementMet ? <Check /> : <CloseRed />}
                        <View
                            flex-1
                            padding-6
                            br10
                            paddingH-12
                            marginL-15
                            style={[
                                styles.box,
                                isRequirementMet
                                    ? styles.boxCheck
                                    : styles.boxUnCheck,
                            ]}
                        >
                            <Text fs13>{requirement}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
    },
    boxCheck: {
        borderColor: Colors.green1,
        backgroundColor: Colors.green2,
    },
    boxUnCheck: {
        borderColor: Colors.red,
        backgroundColor: Colors.red2,
    },
});
