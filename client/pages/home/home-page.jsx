import React from 'react';
import './home.css';
import FileInput from 'react-file-input';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
export default class HomePage extends React.Component {
  handleChange(event) {
    var file = event.target.files[0];
    var dispatch = this.props.dispatch;
    this.readFileFromInput(file, function(base64) {
      dispatch({
        type:'ADD_IMAGE',
        payLoad: base64
      });
      browserHistory.push('/crop');
    });
  }
  readFileFromInput(file, onComplete) {
    var fr = new FileReader();
    fr.onload = function() {
      onComplete(fr.result);
    };
    fr.readAsDataURL(file);
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return <article className="home">
      <h1>iSplit</h1>
      <h2>Sharing is Caring</h2>
        <form>
          <p>UPLOAD IMAGE</p>
         <FileInput name="image"
                    accept=".png,.gif,.jpg,.jpeg"
                    placeholder="Upload Image"
                    className="btn-camera"
                    onChange={this.handleChange}/>
        </form>
    </article>;
  }
}
const exports = connect()(HomePage);
export default exports;
