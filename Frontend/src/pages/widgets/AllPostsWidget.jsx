import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const AllPostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts); // Grab all post from store
  const token = useSelector((state) => state.auth__token); // Grab auth token

  //   Function for getting all the posts
  const getAllPosts = async () => {
    const response = await fetch("http://localhost:5000/posts", {
      method: "GET",
      headers: { Authorization: `${token}` }, // here we pass token to server
    });
    const data = await response.json(); // get data in json format
    dispatch(setPosts({ posts: data })); // set data to posts store variable
  };

  // Function for getting user posts
  const getUserPosts = async () => {
    const response = fetch(`http://localhost:5000/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `${token}` }, // here we pass token to server
    });
    const data = await response.json(); // get data in json format
    dispatch(setPosts({ posts: data })); // set data to posts store variable
  };

  // code work after the web-page load
  useEffect(() => {
    if (isProfile) {
      getUserPosts(); // run if user see their profile
    } else {
      getAllPosts(); // run for home page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          name,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default AllPostsWidget;
