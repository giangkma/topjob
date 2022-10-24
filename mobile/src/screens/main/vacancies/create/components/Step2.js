import React, { useState } from 'react';
import { FormMultipleInput } from './FormMultipleInput';

export const Step2CreateVacancy = ({ onNextStep, vacancy }) => {
    return (
        <FormMultipleInput
            title="Requirements"
            onNextStep={items => onNextStep({ requirements: items })}
            data={vacancy.requirements}
            isUpdate={!!vacancy._id}
        />
    );
};
