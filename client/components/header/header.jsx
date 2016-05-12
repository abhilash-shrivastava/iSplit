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
  showPersonCreator = () => {
    this.props.dispatch({
      'type': 'CHANGE_PERSON_CREATER_VISIBLITY',
      'payLoad': true
    });
  }
  render() {
    return <header>
      <h1>iSplit</h1>
      {this.props.path === '/bill' ? <div className="add-person-icon" onClick={this.showPersonCreator}></div> : null}
    </header>;
  }
}
const exports = connect(state => ({
  path: state.root.path
}))(Header);
export default exports;
