import { createSlice } from "@reduxjs/toolkit";

// Initial Values for Auth state
const initialState = {
  mode: "light",
  users: null,
  token: null,
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
      state.users = action.payload.user;

      // Grabe user token and set it to user initials
      state.token = action.payload.token;
    },

    // 3. Method for Logout user state
    setLogout: (state) => {
      state.users = null;
      state.token = null;
    },

    // 4. Method for controlling ADD or REMOVE friends with logged-In user
    setFriends: (state, action) => {
      // IF user exit then set it to logged-In user friend list
      if (state.users) {
        state.users.friends = action.payload.friends;
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
        if (post._id === action.payload.post_id) return action.payload.post;
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
