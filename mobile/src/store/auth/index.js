import { tokenStorage } from 'utilities';
import { createSlice } from '@reduxjs/toolkit';
import { accountApi } from 'apis';

const slice = createSlice({
    name: 'auth',
    initialState: { user: undefined, organization: undefined },
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
    },
});

export const { onLogout, setUser, setOrganization } = slice.actions;

export const getUser = state => state.auth.user;
export const getOrganization = state => state.auth.organization;

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

export default slice.reducer;
