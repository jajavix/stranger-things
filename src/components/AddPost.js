import React, { useState } from "react";
import { useAuth } from "../custom-hooks";
//import { useHistory } from "react-router-dom";

export default function AddPost() {
  const { token } = useAuth();
  const [title, postTitle] = useState("");
  const [description, postDescription] = useState("");
  const [price, postPrice] = useState("");
  const [location, postLocation] = useState("");
  //const history = useHistory();
  //const { posts, setPosts } = props;
  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ title, description, price, location, token });
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //API structure as instructed
        body: JSON.stringify({ title, description, price, location }),
      }
    );
    const data = await response.json();

    console.log({ data });
    // setPosts([data, ...posts]);
    postTitle("");
    postDescription("");
    postPrice("");
    postLocation("");
  }
  return (
    <>
      {token && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => postTitle(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => postDescription(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => postPrice(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="location"
            value={location}
            onChange={(e) => postLocation(e.target.value)}
          ></input>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      )}
    </>
  );
}
