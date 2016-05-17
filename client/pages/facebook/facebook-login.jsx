import React from 'react';
import FacebookLogin from 'react-facebook-login';
import styles from './facebook.css';
import {connect} from 'react-redux';

class FacebookPage extends React.Component {
  componentWillMount = () => {
    this.setState({'imageUrl': null});
  };
  responseFacebook = response => {
    //console.log(response);
    FB.api(
      "/" + response.id + "/picture",
      function(response) {
        if (response && !response.error) {
          /* handle the result */
          this.setState({
            'imageUrl': response.data.url
          });
          //console.log(response.data.url);
        }
      }
    );
  };

  render() {
    return <article className="facebook-btn">
      <FacebookLogin
        appId="1704240733167659"
        autoLoad={true}
        callback={this.responseFacebook} />
      <img className="profile-picture" src={this.state.imageUrl}/>
    </article>;
  }
}

export default FacebookPage;
const exports = connect(
  state => ({
    image: state.root.image
  })
)(FacebookPage);
export default exports;
