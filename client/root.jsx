import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home/home-page.jsx';
import CropPage from './pages/crop/crop-page.jsx';
import Header from './components/header/header.jsx';
import OverviewPage from './pages/overview/overview-page.jsx';
import TabPage from './pages/tab/tab-page.jsx';
import BillPage  from './pages/bill/bill-page.jsx';
import DetailsPage  from './pages/details/details-page.jsx';
import FacebookPage  from './pages/facebook/facebook-login.jsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import './root.css';
import 'reset-css/reset.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import RootReducer from './reducers/root.js';
import {connect} from 'react-redux';

class Root extends React.Component {
  constructor(props) {
    super();
    this.store = createStore(RootReducer, {}, window.devToolsExtension ? window.devToolsExtension() : undefined);
  }
  componentWillMount() {
    var dispatch = this.props.dispatch;
  }
  render() {
    return <Provider store={this.store}>
      <div>
        <Header></Header>
        <Router history={browserHistory}>
          <Route path="/" component={HomePage} />
          <Route path="/crop" component={CropPage} />
          <Route path="/bill" component={BillPage} />
          <Route path="/overview" component={OverviewPage} />
          <Route path="/tab" component={TabPage} />
          <Route path="/details" component={DetailsPage} />
          <Route path="/facebook" component={FacebookPage} />
        </Router>
      </div>
  </Provider>;
  }
}
ReactDOM.render(<Root/>, document.querySelectorAll('main')[0]);
const exports = connect()(Root);
export default exports;
