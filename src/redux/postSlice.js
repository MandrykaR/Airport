import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    currentPost: null,
  },
  reducers: {
    savePost: (state, action) => {
      state.currentPost = action.payload;
      state.posts.push(action.payload);
    },
  },
});

export const { savePost } = postSlice.actions;
export default postSlice.reducer;
