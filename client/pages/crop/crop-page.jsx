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
    this.setState({'isLoading': true});
    setTimeout(() => {
      this.props.dispatch({
        'type': 'UPDATE_ROUTE',
        'payLoad': '/bill'
      });
      browserHistory.push('/bill');
    }, 5000);
  }
  renderCropper() {
    return <div>
      <ReactCrop src={this.props.image} className="cropper"/>
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
