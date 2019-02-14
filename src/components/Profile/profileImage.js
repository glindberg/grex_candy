import React from "react";
import { Image } from "./styles";

const ImageToProfile = () => (
  <Image>
    <div>
      <img
        className="female"
        src={require(`../Images/Female.png`)}
        alt="Female"
      />
      <img
        className="other"
        src={require(`../Images/Other.png`)}
        alt="Other gender"
      />
      <img className="male" src={require(`../Images/Man.png`)} alt="Man" />
    </div>
  </Image>
);

export default ImageToProfile;
