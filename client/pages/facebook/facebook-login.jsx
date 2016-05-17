import React from 'react';
import FacebookLogin from 'react-facebook-login';

class MyComponent extends React.Component {
  responseFacebook = response => {
    console.log(response);
  };

  render() {
    return (
      <FacebookLogin
        appId="1704240733167659"
        autoLoad={true}
        callback={this.responseFacebook} />
    );
  }
}

export default MyComponent;
