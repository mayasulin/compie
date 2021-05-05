import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PictureDescriptionScreen from './screens/PictureDescription/PictureDecriptionScreen';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GalleryScreen from './screens/Gallery/GalleryScreen';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/"><GalleryScreen /></Route>
      <Route  path="/description/:index"><PictureDescriptionScreen /></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
