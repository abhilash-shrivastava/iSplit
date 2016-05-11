import React from 'react';
import './home.css';
import FileInput from 'react-file-input';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import CogLoader from '../../components/cogloader/cogloader.jsx';

class HomePage extends React.Component {
  handleChange(event) {
    this.setState({
      'isLoading': true
    });
    this.forceUpdate();
    var file = event.target.files[0];
    var dispatch = this.props.dispatch;
    var self = this;
    setTimeout(function() {
      self.readFileFromInput(file, function(base64) {
        dispatch({
          type:'ADD_IMAGE',
          payLoad: base64
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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }
  renderLoader() {
    return <CogLoader/>;
  }
  renderPage() {
    return <div>
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
    </div>;
  }
  render() {
    return <article className="home">
      {!this.state.isLoading ? this.renderPage() : this.renderLoader()}
    </article>;
  }
}
const exports = connect()(HomePage);
export default exports;
