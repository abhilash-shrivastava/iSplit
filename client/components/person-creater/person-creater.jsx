import React from 'react';
import './person-creater.css';
import {connect} from 'react-redux';
class PersonCreater extends React.Component {
  componentWillMount() {
    this.setState({
      'person': {
        'name': '',
        'phone': ''
      }
    });
  }
  hide = () => {
    this.props.dispatch({
      'type': 'CHANGE_PERSON_CREATER_VISIBLITY',
      'payLoad': false
    });
  }
  hideFromBackdrop = event => {
    if (event.nativeEvent.target.className === "person-creater") {
      this.props.dispatch({
        'type': 'CHANGE_PERSON_CREATER_VISIBLITY',
        'payLoad': false
      });
    }
  }
  submit = event => {
    event.preventDefault();
    this.props.dispatch({
      'type': 'ADD_PERSON',
      'payLoad': this.state.person
    });
  }
  updateName = event => {
    var newState = Object.assign({}, this.state);
    newState.person.name = event.target.value;
    this.setState(newState);
  }
  updatePhone = event => {
    var newState = Object.assign({}, this.state);
    newState.person.phone = event.target.value;
    this.setState(newState);
  }
  render() {
    return <div className="person-creater" onClick={this.hideFromBackdrop}>
      <form className="form" onSubmit={this.submit}>
        <div className="btn-form-close" onClick={this.hide}></div>
        <p>Add Someone</p>
        <input required type="text" placeholder="Name" value={this.state.person.name}  onChange={this.updateName}></input>
        <input required type="phone" placeholder="phone" value={this.state.person.phone}  onChange={this.updatePhone}></input>
        <button className="btn-crop">CONFIRM</button>
      </form>
    </div>;
  }
}
const exports = connect(state => ({
}))(PersonCreater);
export default exports;
