import React from "react";

// <ImageToProfile gender={this.state.profile.gender} /> Male eller Female eller Other
const ImageToProfile = props =>
  props.gender === "Man" ? (
    <img className="male" src={require(`../Images/Male.png`)} alt="Man" />
  ) : props.gender === "Female" ? (
    <img
      className="Female"
      src={require(`../Images/Female.png`)}
      alt="Female"
    />
  ) : (
    <img
      className="Other"
      src={require(`../Images/Other.png`)}
      alt="Other gender"
    />
  );

export default ImageToProfile;
