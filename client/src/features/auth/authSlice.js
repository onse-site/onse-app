import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  isAuthenticated: false,
  member: null,
  status: "idle",
};

export const session = createAsyncThunk("auth/session", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/auth/session", {
      credentials: "include",
    });
    return response.data.member;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.member = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.member = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(session.pending, (state) => {
        state.isAuthenticated = false;
        state.member = null;
        state.status = "loading";
      })
      .addCase(session.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.member = action.payload;
        state.status = "succeeded";
      })
      .addCase(session.rejected, (state) => {
        state.isAuthenticated = false;
        state.member = null;
        state.status = "failed";
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
