//route
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { LoginOrRegister, Posts, AddPost, Nav, Me } from "./components";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Nav />
      <Switch>
        {/*logged in routes*/}
        {isLoggedIn && (
          <>
            {/* anything that requires an authorization header is the fetch, any create, update, delete action */}
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/addpost" component={AddPost} />
            <Route path="/me" component={Me} />
          </>
        )}

        {/*logged in routes*/}
        {!isLoggedIn && (
          <>
            {/* anything that requires an authorization header is the fetch, any create, update, delete action */}
            <Route exact path="/posts" component={Posts} />
            <Route path="/login" component={LoginOrRegister} />
            <Route path="/register" component={LoginOrRegister} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
