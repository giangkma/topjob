import { Alert } from 'react-native';
import {
    Person0,
    Person1,
    Person2,
    Person3,
    Person4,
    Person5,
    Person6,
    Person7,
    Person8,
    Person9,
    Person10,
} from 'assets';
import React from 'react';

export const showAlert = (subTitle, title = 'Error') => {
    Alert.alert(title, subTitle);
};

export const getInitials = string => {
    if (!string) return '';
    const names = string.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export const cutString = (string, length) => {
    if (!string) return '';
    if (string.length > length) {
        return string.substring(0, length) + '...';
    }
    return string;
};

export const convertToSalary = number => {
    const string = number.toString();
    const length = string.length;
    if (length <= 3) return string;
    if (length <= 6) {
        return (
            string.substring(0, length - 3) + '.' + string.substring(length - 3)
        );
    }
    if (length <= 9) {
        return (
            string.substring(0, length - 6) +
            '.' +
            string.substring(length - 6, length - 3) +
            '.' +
            string.substring(length - 3)
        );
    }
};
