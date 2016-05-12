import React from 'react';
import {Link} from 'react-router';
import styles from './crop.css';
import cropStyles from './reactcrop.css';
import {connect} from 'react-redux';
import CogLoader from '../../components/cogloader/cogloader.jsx';
import {browserHistory} from 'react-router';
import ReactCrop from 'react-image-crop';
import 'react-fastclick';

export default class CropPage extends React.Component {
  componentWillMount() {
    this.setState({'isLoading': false});
  }
  onSubmit = () => {
    this.setState({
      'isLoading': true
    });
    this.transcribeBill(json => {
      this.props.dispatch({
        'type': 'UPDATE_ROUTE',
        'payLoad': '/bill'
      });
      this.props.dispatch({
        'type': 'SET_BILL',
        'payLoad': json.items
      });
      browserHistory.push('/bill');
    });
  }
  transcribeBill(callback) {
    var form = new FormData();
    form.append('image', this.props.image.file);
    fetch('http://localhost:3000', {
      method: 'POST',
      body: form
    }).then(function(response) {
      response.json().then(json => {
        callback(json);
      });
    });
  }
  renderCropper() {
    return <div>
      <ReactCrop src={this.props.image.base64} className="cropper"/>
      <button className="btn-crop" onClick={this.onSubmit}>
        Confirm Crop
      </button>
    </div>;
  }
  renderLoader() {
    return <CogLoader></CogLoader>;
  }
  render() {
    return <article className="crop">
      {this.state.isLoading ?  this.renderLoader() : this.renderCropper()}
    </article>;
  }
}
const exports = connect(
   state => ({
     image: state.root.image
   })
)(CropPage);
export default exports;
