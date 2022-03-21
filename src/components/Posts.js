import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Posts() {
  //posts need to manage the post data coming from our stranger things app
  //so we need two pieces of info
  //a way of holding onto state: useState
  //a way of handling async effects: useEffect

  //search box
  const { search } = useLocation();
  const history = useHistory();
  console.log("search", search);
  const searchParams = new URLSearchParams(search);
  console.log("searchParams", searchParams);
  const searchTerm = searchParams.get("searchTerm") || "";
  console.log("searchTerm", searchTerm);

  //post
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    //create as async fetch function
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts`
        );
        //unpacked the response stream
        const { success, data } = await response.json();
        console.log(data);
        if (success) {
          setPosts(data.posts);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    // call it
    fetchPosts();
  }, []);

  //filter post function returns a boolean
  const postMatch = (post, searchTerm) => {
    const { location, title, price } = post;
    console.log("post fields", location, title, price);
    // console.log("searchTerm inside match", searchTerm);
    const toCheck = [location, title, price];
    for (const field of toCheck) {
      if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  };

  //filter variable to get posts, searchterm
  const filterPosts = posts.filter((post) => postMatch(post, searchTerm));
  console.log("filterPosts", filterPosts);

  //return
  return (
    <section>
      <div>
        <h1>Welcome to Stranger Things</h1>
      </div>
      <hr></hr>
      <div className="post-card">
        <h2>Search</h2>
        <input
          type="text"
          placeholder="enter something"
          onChange={(e) =>
            history.push(
              e.target.value ? `/posts?searchTerm=${e.target.value}` : "/posts"
            )
          }
        />
      </div>
      <hr></hr>
      <div className="'post-main-container">
        {posts &&
          filterPosts.map((post) => (
            <div key={post._id} className="post-card">
              <h4>Post ID: {post.title}</h4>
              <p>Post Title: {post.description} </p>
              <p>Price: {post.price} </p>
              <p>Location: {post.location} </p>
              <Link to="posts/new">
                <button>Edit Post</button>
                <button>Message</button>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
