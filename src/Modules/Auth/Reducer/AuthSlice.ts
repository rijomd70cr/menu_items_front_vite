import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginAction } from '../Reducer/AuthAction';
import { ACCESS_TOKEN, AUTH_USER } from "../../../Services/Methods/AuthMethods";

export interface CounterState {
    isLoading: boolean;
    auth: boolean;
}

const initialState: CounterState = {
    isLoading: false,
    auth: false,
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.auth = true;
            localStorage.setItem(AUTH_USER, action.payload.data?.selectedItemUser);
            localStorage.setItem(ACCESS_TOKEN, action.payload.data?.token);
        })
        builder.addCase(loginAction.rejected, (state) => {
            state.isLoading = false;
        })
    },
});

export const { login } = authSlice.actions;  //export actions
export default authSlice.reducer; //export reducer
