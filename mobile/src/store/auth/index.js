import { tokenStorage } from 'utilities';
import { createSlice } from '@reduxjs/toolkit';
import { accountApi, applyApi, organizationApi, vacancyApi } from 'apis';

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: undefined,
        organization: undefined,
        vacancies: [],
        applies: [],
    },
    reducers: {
        onLogout: state => {
            tokenStorage.clear();
            state.user = undefined;
            state.organization = undefined;
        },
        setUser: (state, { payload: user }) => {
            state.user = {
                ...state.user,
                ...user,
            };
        },
        setOrganization: (state, { payload: organization }) => {
            state.organization = organization;
        },
        setVacancies: (state, { payload: vacancies }) => {
            state.vacancies = vacancies;
        },
        setApplies: (state, { payload: applies }) => {
            state.applies = applies;
        },
    },
});

export const { onLogout, setUser, setOrganization, setVacancies, setApplies } =
    slice.actions;

export const getUser = state => state.auth.user;
export const getOrganization = state => state.auth.organization;
export const getVacancies = state => state.auth.vacancies;
export const getApplies = state => state.auth.applies;

// Init

export const getInitStateForOrganizationThunk =
    organization => async dispatch => {
        dispatch(setOrganization(organization));
        await dispatch(getProfileThunk());
        await dispatch(fetchVacanciesThunk());
        await dispatch(fetchAppliesThunk());
    };

// Auth

export const loginThunk = data => async dispatch => {
    const { token } = await accountApi.postLogin(
        data.email.toLowerCase(),
        data.password,
    );
    tokenStorage.set(token);
    const user = await dispatch(getProfileThunk());
    dispatch(setOrganization(user.organizations[0]));
};

export const getProfileThunk = () => async dispatch => {
    const user = await accountApi.getUserInfo();
    dispatch(setUser(user));
    return user;
};

// Organization

export const newOrganizationThunk = data => async dispatch => {
    const organization = await organizationApi.postCreate(data);
    dispatch(getInitStateForOrganizationThunk(organization));
};

export const updateOrganizationThunk = data => async (dispatch, getState) => {
    const organizationId = getState().auth?.organization?._id;
    if (!organizationId) return;
    const organizationUpdated = await organizationApi.putUpdate(
        organizationId,
        data,
    );
    await dispatch(getProfileThunk());
    dispatch(setOrganization(organizationUpdated));
};

// Vacancy

export const fetchVacanciesThunk = () => async (dispatch, getState) => {
    const organizationId = getState().auth?.organization?._id;
    if (!organizationId) return;
    const data = await vacancyApi.getVacanciesOfOrganization(organizationId);
    dispatch(setVacancies(data));
    return data;
};

export const updateJobVacancyThunk = data => async dispatch => {
    await vacancyApi.updateJobVacancy(data);
    await dispatch(fetchVacanciesThunk());
};

export const postJobVacancyThunk = data => async (dispatch, getState) => {
    const organizationId = getState().auth?.organization?._id;
    if (!organizationId) return;
    await vacancyApi.postJobVacancy({ ...data, organizationId });
    await dispatch(fetchVacanciesThunk());
};

export const deleteJobVacancyThunk = id => async dispatch => {
    await vacancyApi.deleteJobVacancy(id);
    await dispatch(fetchVacanciesThunk());
};

// Apply

export const fetchAppliesThunk = () => async (dispatch, getState) => {
    const organizationId = getState().auth?.organization?._id;
    if (!organizationId) return;
    const data = await applyApi.getAllApply(organizationId);
    dispatch(setApplies(data));
    return data;
};
export const sendToApplicantThunk = (vacancyId, data) => async dispatch => {
    await applyApi.sendToApplication(vacancyId, data);
    await dispatch(fetchAppliesThunk());
};

export default slice.reducer;
