import { CheckBlue, Remove } from 'assets';
import { Colors } from 'assets';
import { PrimaryButton } from 'components';
import { ScrollView, StyleSheet } from 'react-native';
import Textarea from 'react-native-textarea';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { scaleSize, showAlert } from 'utilities';
import React, { useState } from 'react';

const CustomInput = ({ onChange, value, onRemove, enableEdit, onEdit }) => {
    return (
        <View style={{ position: 'relative' }} paddingT-8>
            <TouchableOpacity
                style={styles.container}
                bg-white={enableEdit}
                bg-grey4={!enableEdit}
                padding-10
                onPress={onEdit}
            >
                <View style={styles.icon}>
                    <CheckBlue />
                </View>
                {enableEdit ? (
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={onChange}
                        defaultValue={value}
                        placeholder={'Enter something...'}
                        placeholderTextColor={Colors.grey}
                    />
                ) : (
                    <Text marginL-5>{value}</Text>
                )}
            </TouchableOpacity>
            <View absT absR>
                <TouchableOpacity onPress={onRemove}>
                    <Remove />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const FormMultipleInput = ({ onNextStep, title, data, isUpdate }) => {
    const [items, setItem] = useState(data);
    const [indexItemEdit, setIndexItemEdit] = useState();

    const addItem = () => {
        setItem(prev => [...prev, '']);
        setIndexItemEdit(items.length);
    };

    const removeItem = index => {
        setItem(prev => prev.filter((_, i) => i !== index));
    };

    const editItem = (index, value) => {
        setItem(prev => {
            prev[index] = value;
            return [...prev];
        });
    };

    const onClickNext = () => {
        if (items.length === 0) {
            return;
        }
        const isAllItemFilled = items.every(item => item.trim() !== '');
        if (!isAllItemFilled) {
            showAlert('Please fill all input');
            return;
        }
        onNextStep(items);
    };

    return (
        <View flex spread height="100%">
            <ScrollView>
                {items?.map((item, index) => {
                    const enableEdit = indexItemEdit === index;
                    return (
                        <View key={index} marginB-12>
                            <CustomInput
                                value={item}
                                onChange={value => editItem(index, value)}
                                onRemove={() => removeItem(index)}
                                enableEdit={enableEdit}
                                onEdit={() => setIndexItemEdit(index)}
                            />
                        </View>
                    );
                })}
                <PrimaryButton
                    onPress={addItem}
                    marginB-20
                    marginT-10
                    text={`Add New ${title}`}
                    border
                    small
                />
            </ScrollView>
            <PrimaryButton
                onPress={onClickNext}
                marginB-10
                paddingT-15
                text={isUpdate ? 'Update Vacancy' : 'Next'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingLeft: scaleSize(45),
        borderWidth: 1.2,
        borderColor: Colors.grey4,
    },
    icon: {
        position: 'absolute',
        left: scaleSize(15),
        top: '50%',
        zIndex: 1,
    },
    textareaContainer: {
        height: 90,
    },
    textarea: {
        textAlignVertical: 'top',
    },
});
