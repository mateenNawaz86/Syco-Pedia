import { createSlice } from "@reduxjs/toolkit";

// Initial Values for Auth state
const initialState = {
  mode: "light",
  user: null,
  auth__token: null,
  posts: [],
};

// Redux SLICE for Authentication of user
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //1. Method for controlling Website mode
    setMode: (state) => {
      // Redux-toolkit allow us to mute state directly
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    //2.  Method for controlling Login user state
    setLogin: (state, action) => {
      // Set arguments of user to initial state
      state.user = action.payload.user;

      // Grabe user token and set it to user initials
      state.auth__token = action.payload.auth__token;
    },

    // 3. Method for Logout user state
    setLogout: (state) => {
      state.user = null;
      state.auth__token = null;
    },

    // 4. Method for controlling ADD or REMOVE friends with logged-In user
    setFriends: (state, action) => {
      // IF user exit then set it to logged-In user friend list
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("User Friend NOT exist!");
      }
    },

    // 5. Method for controlling posts
    setPosts: (state, action) => {
      // Post a newly created Post
      state.posts = action.payload.posts;
    },

    // 6. Method for controlling Update post state when user add new post
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });

      state.posts = updatedPosts;
    },
  },
});

// Export actions
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
