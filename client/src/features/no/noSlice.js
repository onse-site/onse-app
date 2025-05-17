import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: null,
  posts: null,
};
const noSlice = createSlice({
  name: "no",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    clearMembers: (state) => {
      state.members = null;
    },
    clearPosts: (state) => {
      state.posts = null;
    },
  },
});

export const { setMembers, setPosts, clearMembers, clearPosts } =
  noSlice.actions;
export default noSlice.reducer;
