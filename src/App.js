import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Notes from "./components/Notes/Notes";
import Note from "./components/Note/Note";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Notes} />
      <Route exact path="/:id" component={Note} />
    </div>
  </BrowserRouter>
);

export default App;
