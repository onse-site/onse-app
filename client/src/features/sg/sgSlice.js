import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  posts: null,
};

export const sgSlice = createSlice({
  name: "sg",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    clearInfo: (state) => {
      state.info = null;
    },
    clearPosts: (state) => {
      state.posts = null;
    },
  },
});
export const { setInfo, setPosts, clearInfo, clearPosts } = sgSlice.actions;
export default sgSlice.reducer;
