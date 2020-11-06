import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import Join from "./components/Join/Join"
import Chat from "./components/Chat/Chat"
import Editor from "./components/Editor/Editor"

const App = () => {
  return <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" exact component={Chat} />
    <Route path="/editor" exact component={Editor} />
  </Router>
}

export default App;
