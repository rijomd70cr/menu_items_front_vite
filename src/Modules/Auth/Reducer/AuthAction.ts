/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../Services/Store/Store';
import axios from "../../../Services/Request";

import { loginUrl } from "../Config/urlConstants";
import { AUTH_USER, ACCESS_TOKEN } from '../../../Services/Methods/AuthMethods';

import { useNotify } from '../../../Services/Hook/useNotify';

export const getAuthAction = (state: RootState) => state.authentication.auth;

export const loginAction = createAsyncThunk('authentication/loginAction',
  async (body: any, thunkAPI) => {
    try {
      const response: any = await axios.post<any>(loginUrl, body);
      if (response.statusText !== "OK") {
        throw new Error(`HTTP error! Status: ${response.status || '590'}`);
      }
      localStorage.setItem(AUTH_USER, JSON.stringify(response.user));
      localStorage.setItem(ACCESS_TOKEN, response.access_token);
      return response.data;

    } catch (error: any) {
      console.error(error);
      useNotify(error.message || "error !", 'error');
      return thunkAPI.rejectWithValue(error.message || "error");
    }
  }
)