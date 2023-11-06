import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../apis/user";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      localStorage.setItem("Token", response.headers.authorization);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("Token");
      state.user = null;
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.meta.arg.email;
    },
    [loginThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
