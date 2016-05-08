import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home/home-page.jsx';
import CropPage from './pages/crop/crop-page.jsx';
import Header from './components/header/header.jsx';
import ProcessingPage from './pages/processing/processing-page.jsx';
import OverviewPage from './pages/overview/overview-page.jsx';
import SendingPage from './pages/sending/sending-page.jsx';
import TabPage from './pages/tab/tab-page.jsx';
import BillPage  from './pages/bill/bill-page.jsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './root.css';
import 'reset-css/reset.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import RootReducer from './reducers/root.js';

export default class Root extends React.Component {
  constructor() {
    super();
    this.store = createStore(RootReducer);
  }
  render() {
    return <Provider store={this.store}>
      <div>
        <Header></Header>
        <Router history={browserHistory}>
          <Route path="/" component={HomePage} />
          <Route path="/crop" component={CropPage} />
          <Route path="/processing" component={ProcessingPage} />
          <Route path="/bill" component={BillPage} />
          <Route path="/overview" component={OverviewPage} />
          <Route path="/sending" component={SendingPage} />
          <Route path="/tab" component={TabPage} />
        </Router>
      </div>
  </Provider>;
  }
}
ReactDOM.render(<Root/>, document.querySelectorAll('main')[0]);
