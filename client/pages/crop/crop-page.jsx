import React from 'react';
import {Link} from 'react-router';
import styles from './crop.css';
import cropStyles from './reactcrop.css';
import {connect} from 'react-redux';
import ReactCrop from 'react-image-crop';
export default class CropPage extends React.Component {
  render() {
    let image = this.props.image;
    return <article className="crop">
      <ReactCrop src={image} className="cropper"/>
    </article>;
  }
}
const exports = connect(
   state => ({
     image: state.root.image
   })
)(CropPage);
export default exports;
