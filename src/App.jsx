import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import gsap from "gsap";

import Header from "./components/Header/";

import routes from "./constants/routes";
import "./App.less";
import { Power4 } from "gsap/gsap-core";

// TODO: clean node warnings
// TODO: add Sliders

const App = () => {
  const history = useHistory();
  const [path, setPath] = useState();
  useEffect(() => {
    setPath(window.location.pathname);
    history.listen((location, action) => {
      setPath(window.location.pathname);
    });
  }, [history]);

  let ref = useRef(null);
  useEffect(() => {
    gsap.to(ref, {
      opacity: 1,
      duration: 1,
      ease: Power4.easeIn,
    });
  }, []);

  return (
    <div
      ref={(el) => (ref = el)}
      className="App"
      style={
        path === "/"
          ? {
              backgroundImage: "url('/assets/img/apart.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      <Header />
      <Switch>
        {routes.map((route, i) => {
          return (
            <Route
              key={i}
              {...(route.exact && { exact: true })}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </div>
  );
};

export default App;
