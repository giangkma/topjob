import React, { useState } from 'react';
import { FormMultipleInput } from './FormMultipleInput';

export const Step3CreateVacancy = ({ onNextStep, data }) => {
    return (
        <FormMultipleInput
            title="Benifits"
            onNextStep={onNextStep}
            data={data}
        />
    );
};
