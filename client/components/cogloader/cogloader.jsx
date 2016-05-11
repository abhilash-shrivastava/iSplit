import React from "react";
import "./cogloader.css";
export default class CogLoader extends React.Component {
  render() {
    return <div className="loader-cog">
      <div>
        <div className="images">
          <img src="http://i.imgur.com/MvMW2w9.png" className="cog"/>
          <img src="http://i.imgur.com/MvMW2w9.png" className="cog-small"/>
        </div>
        <p>Processing</p>
      </div>
    </div>;
  }
}
