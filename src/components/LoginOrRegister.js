import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function LoginOrRegister() {
  const history = useHistory();
  const { updateAuthStatus } = useAuth();
  //const location = useLocation();
  const { pathname } = useLocation();

  const loginOrRegister = pathname.slice(1);

  //console.log(location);
  //console.log(pathname);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  //use dynamic propery e
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2202-FTB-PT-WEB-FT/users/${loginOrRegister}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: form }),
        }
      );

      const { success, data } = await response.json();

      if (success) {
        localStorage.st_token = data.token;
        updateAuthStatus();
        history.push("/me");
      } else {
        throw new Error(
          `error ${
            loginOrRegister === "login" ? "logging in" : "registering"
          } user `
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{loginOrRegister === "register" && "Choose "} Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>{loginOrRegister === "register" && "Choose "} Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value={loginOrRegister === "register" ? "Sign Up" : "Login"}
      />
    </form>
  );
}
