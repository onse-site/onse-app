import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  offices: null,
  members: null,
  posts: null,
};

export const poSlice = createSlice({
  name: "po",
  initialState,
  reducers: {
    setOffices: (state, action) => {
      state.offices = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});
export const { setOffices, setMembers, setPosts } = poSlice.actions;
export default poSlice.reducer;
