import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home-page.jsx';
import CropPage from './pages/crop-page.jsx';
import {Router, Route, IndexRoute} from 'react-router';

export default class Root extends React.Component {
  render() {
    return <Router>
     <Route path="/" component={HomePage} />
     <Route path="/crop" component={CropPage} />
    </Router>
  }
}
ReactDOM.render(<Root/>, document.querySelectorAll('main')[0]);
