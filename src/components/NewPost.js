import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function NewPost() {
  //token
  const { token } = useAuth;
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const { search, panthname } = useLocation();
  console.log(search);

  //sent user to this
  const history = useHistory();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.go(form, token);

    try {
      //fetch to get a response whether our POST action was successful
      const response = await fetch(
        "http://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          //API structure as instructed
          body: JSON.stringify({ post: form }),
        }
      );
      //resolve data
      const { success } = await response.json();

      //we leverage the history api to shunt our user elsewhere after successful POS action
      if (success) {
        history.push("/posts");
      } else {
        throw new Error("error creating post");
      }

      //catch
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section>
      <h1>Add New Post</h1>
    </section>
  );
}
