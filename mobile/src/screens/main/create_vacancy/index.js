import { BackPageButton, LoadingScreen } from 'components';
import { StyleSheet } from 'react-native';
import { Layout } from 'screens';
import React, { useState } from 'react';
import {
    Step1CreateVacancy,
    Step2CreateVacancy,
    Step3CreateVacancy,
    Step4CreateVacancy,
} from './components';

export const CreateVacancyScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        infor: {
            position: '1',
            salary: '2323',
            location: '1',
            type: '1',
        },
        requirements: [
            'asjd jadas djasd asdasdjas a asd a lorem10 sa adas jas asd jasdjasdjasjd adjajdjasdj sad asjd asdad asdajdas',
        ],
        benifits: [
            'asjd jadas djasd asdasdjas a asd a lorem10 sa adas jas asd jasdjasdjasjd adjajdjasdj sad asjd asdad asdajdas',
            'asjd jadas djasd asdasdjas a asd a lorem10 sa adas jas asd jasdjasdjasjd adjajdjasdj sad asjd asdad asdajdas',
            'asjd jadas djasd asdasdjas a asd a lorem10 sa adas jas asd jasdjasdjasjd adjajdjasdj sad asjd asdad asdajdas',
            'asjd jadas djasd asdasdjas a asd a lorem10 sa adas jas asd jasdjasdjasjd adjajdjasdj sad asjd asdad asdajdas',
        ],
    });

    const [currentStep, setCurrentStep] = useState(4);

    const onPrevStep = () => {
        if (currentStep === 1) {
            navigation.goBack();
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    const onNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const onPostJobVacancy = () => {
        console.log('data: ', data);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 2: // requirements
                return (
                    <Step2CreateVacancy
                        onNextStep={onNextStep}
                        data={{
                            get: () => data.requirements,
                            set: value =>
                                setData({ ...data, requirements: value }),
                        }}
                    />
                );
            case 3: // benifits
                return (
                    <Step3CreateVacancy
                        onNextStep={onNextStep}
                        data={{
                            get: () => data.benifits,
                            set: value => setData({ ...data, benifits: value }),
                        }}
                    />
                );
            case 4: // benifits
                return <Step4CreateVacancy data={data} />;
            default: // infor
                return (
                    <Step1CreateVacancy
                        onNextStep={onNextStep}
                        data={{
                            get: () => data.infor,
                            set: value => setData({ ...data, infor: value }),
                        }}
                    />
                );
        }
    };

    return (
        <Layout>
            {loading && <LoadingScreen />}
            <BackPageButton text="Create Vacancies" onPress={onPrevStep} />
            {renderStep()}
        </Layout>
    );
};

const styles = StyleSheet.create({});
