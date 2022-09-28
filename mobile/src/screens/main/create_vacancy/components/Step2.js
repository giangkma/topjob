import React, { useState } from 'react';
import { FormMultipleInput } from './FormMultipleInput';

export const Step2CreateVacancy = ({ onNextStep, data }) => {
    return (
        <FormMultipleInput
            title="Requirements"
            onNextStep={onNextStep}
            data={data}
        />
    );
};
