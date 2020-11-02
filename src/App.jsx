import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/";

import routes from "./constants/routes";
import "./App.less";

// TODO: clean node warnings
// TODO: add Sliders

const App = () => {
  return (
    <div className="App">
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
