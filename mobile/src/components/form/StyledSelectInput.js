import { Colors } from 'assets';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, View } from 'react-native-ui-lib';
import { scaleSize } from 'utilities/responsive';
import React from 'react';

export const StyledSelectInput = ({
    placeholder,
    onChange,
    value = [],
    error,
    required,
    items,
    label,
    multiple = false,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <View marginT-12>
            {label && (
                <View marginB-10 style={styles.label}>
                    <Text fw8>
                        {label}
                        {required && <Text red> *</Text>}
                    </Text>
                </View>
            )}
            <View style={styles.container}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={getValue => onChange(getValue())}
                    style={styles.textInput}
                    containerStyle={{
                        zIndex: 1000,
                    }}
                    multiple={multiple}
                    mode="BADGE"
                    showBadgeDot={true}
                    placeholder={placeholder}
                />
            </View>
            {error && (
                <Text error marginL-22 marginT-2>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: scaleSize(43),
        borderRadius: 100,
    },
    label: {
        paddingLeft: scaleSize(20),
    },
    textInput: {
        backgroundColor: Colors.white,
        borderRadius: 100,
        height: scaleSize(43),
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20),
        borderWidth: 1.5,
        borderColor: Colors.grey4,
    },
});
