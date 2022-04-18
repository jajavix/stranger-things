import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Me() {
  const { token } = useAuth();
  const [me, setMe] = useState({});
  console.log(useState({}));

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { success, data: me } = await response.json();

        if (success) {
          // console.log({ me, setMe });
          setMe(me);
        } else {
          throw new Error("error fetching me");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMe();
  }, [token]);

  //checking an error I encountered!!
  if (!!me) {
    // console.log(me);
  } else {
    // console.log("setMe doesnt exist");
  }

  if (!!setMe) {
    //  console.log(setMe);
  } else {
    // console.log("me doesnt exist");
  }

  const { messages } = me || {};
  const { posts } = me || {};
  const { username } = me || {};

  const activePosts = posts ? posts.filter((post) => post.active) : [];
  const inactivePosts = posts ? posts.filter((post) => !post.active) : [];

  //  console.log(messages, posts);

  //soft deletePost
  async function deletePost(postId) {
    // preventDefault();
    try {
      const response = await fetch(
        `http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = await response.json();
      if (success) {
        const filteredPosts = posts.map((post) => {
          if (post._id === postId) {
            post.active = false;
          }
          return post;
        });

        setMe({ ...me, posts: filteredPosts });
      }

      // console.log(postId);
    } catch (error) {
      console.error(error);
    }
  }

  //return
  return (
    <section>
      <div>
        <h1>
          Welcome,
          {username}
        </h1>
      </div>
      <h2>My Messages</h2>
      <div className="post-card">
        {messages &&
          messages.map((msg) => (
            <article key={msg._id}>
              <h4>Post ID: {msg.post._id}</h4>
              <p>Post Title: {msg.post.title} </p>
              <button>View Message</button>
            </article>
          ))}
      </div>
      <h2>My Posts</h2>
      <h3>Active Posts</h3>
      <div className="post-card">
        {activePosts.length
          ? activePosts.map((post) => (
              <article key={post._id}>
                <h4>Post ID: {post.title}</h4>
                <p>Post Title: {post.description} </p>
                <p>Price: {post.price} </p>
                <NavLink
                  key="6"
                  to={`/editpost/?title=${post.title}&description=${post.description}&price=${post.price}&location=${post.location}&willDeliver=${post.willDeliver}&post_id=${post._id}`}
                  className="editButton"
                >
                  Edit
                </NavLink>
                <button onClick={() => deletePost(post._id)}>
                  delete this post
                </button>
              </article>
            ))
          : "no active posts"}
      </div>
      <h3>Inactive Posts</h3>
      <div className="post-card">
        {inactivePosts.length
          ? inactivePosts.map((post) => (
              <article key={post._id}>
                <h4>Post ID: {post.title}</h4>
                <p>Post Title: {post.description} </p>
                <p>Price: {post.price} </p>
              </article>
            ))
          : "no inactive post"}
      </div>
    </section>
  );
}
