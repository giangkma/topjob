import React from 'react';
import { FormMultipleInput } from './FormMultipleInput';

export const Step3CreateVacancy = ({ onNextStep, vacancy }) => {
    return (
        <FormMultipleInput
            title="benefits"
            onNextStep={items => {
                onNextStep({ benefits: items });
            }}
            data={vacancy.benefits}
            isUpdate={!!vacancy._id}
        />
    );
};
