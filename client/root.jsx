import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home/home-page.jsx';
import CropPage from './pages/crop/crop-page.jsx';
import Header from './components/header/header.jsx';
import './root.css';
import 'reset-css/reset.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

export default class Root extends React.Component {
  render() {
    return <div>
    <Header></Header>
    <Router history={browserHistory}>
     <Route path="/" component={HomePage} />
     <Route path="/crop" component={CropPage} />
    </Router>
  </div>
  }
}
ReactDOM.render(<Root/>, document.querySelectorAll('main')[0]);
