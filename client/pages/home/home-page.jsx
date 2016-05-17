import React from 'react';
import './home.css';
import FileInput from 'react-file-input';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import CogLoader from '../../components/cogloader/cogloader.jsx';
import FacebookLogin from 'react-facebook-login';

class HomePage extends React.Component {
  handleChange = event => {
    this.setState({
      'isLoading': true
    });
    this.forceUpdate();
    var file = event.target.files[0];
    var dispatch = this.props.dispatch;
    setTimeout(() => {
      this.readFileFromInput(file, base64 =>  {
        dispatch({
          type:'ADD_IMAGE',
          payLoad: {
            'base64': base64,
            'file': file
          }
        });
        dispatch({
          'type': 'UPDATE_ROUTE',
          'payLoad': '/crop'
        });
        browserHistory.push('/crop');
      });
    }, 10);
  }
  readFileFromInput(file, onComplete) {
    var fr = new FileReader();
    fr.onload = function() {
      onComplete(fr.result);
    };
    fr.readAsDataURL(file);
  }
  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }
  responseFacebook = response => {
    let me = {
      'key': 'me',
      'colorCode': 'rgba(255, 180, 122, 0.61)',
      'name': response.name.split(' ')[0],
      'email': 'test@test'
    };
    FB.api(
      "/" + response.id + "/picture",
      response => {
        if (response && !response.error) {
          me.picture = response.data.url;
          this.props.dispatch({
            'type': 'ADD_ME',
            'payLoad': me
          });
        }
      }
    );
  }
  renderLoader() {
    return <CogLoader/>;
  }
  renderFacebookButton() {
    return <FacebookLogin
        appId="1704240733167659"
        callback={this.responseFacebook} />;
  }
  renderCameraButton() {
    return <form>
      <p>UPLOAD BILL</p>
     <FileInput name="image"
                accept=".png,.gif,.jpg,.jpeg"
                placeholder="Upload Bill"
                className="btn-camera"
                onChange={this.handleChange}/>
            </form>;
  }
  renderPage() {
    return <div>
      <h1>iSplit</h1>
      <h2>Sharing is Caring</h2>
      {this.props.me ? this.renderCameraButton() : this.renderFacebookButton()}
    </div>;
  }
  render() {
    return <article className="home">
      {!this.state.isLoading ? this.renderPage() : this.renderLoader()}
    </article>;
  }
}
const exports = connect(
  state => ({
    me: state.root.people.me
  })
)(HomePage);
export default exports;
