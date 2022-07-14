import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createRoot } from 'react-dom/client';
import mem from 'mem'

const packageJSON = require("../package.json");

const mount = (el, props = {}, Wrapped) => {
  try {
    let Application;

    if (!Wrapped) {
      Application = <App {...props} />;
    } else {
      Application = <Wrapped {...props}/>;
    }
    const root = loadRoot(el)
    root.render(Application);
  } catch (error) {
  }
};

const loadRoot = mem((el) => createRoot(el))

// we are running the project in isolation
// if there is a div with the unique id (see public/index.html) (ASSUMPTION!)
// there cannot be a div element with this id anywhere else! (therefore we're trying to make that as unique as possible)
const el = document.querySelector("#a4fead9a-19b3-4663-aecd-b7854874ea34");
if (el) {

  // look at StandaloneApp
  mount(el, {}, App)
}

export default mount;
