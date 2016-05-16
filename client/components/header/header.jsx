import React from 'react';
import './header.css';
import {connect} from 'react-redux';
class Header extends React.Component {
  componentWillMount() {
    window.addEventListener('popstate', () => {
      this.props.dispatch({
        'type': 'UPDATE_ROUTE',
        'payLoad': window.location.pathname
      });
    });
  }
  render() {
    return <header>
      <h1>iSplit</h1>
    </header>;
  }
}
const exports = connect(state => ({
  path: state.root.path
}))(Header);
export default exports;
