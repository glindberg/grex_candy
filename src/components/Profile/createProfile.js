import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { AuthUserContext, withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";
import { CreateP } from "../Profile/styles";
import { BtnContainer } from "./styles";
import { Button } from "../Styles/button";
import { UserD } from "../Styles/icons";

const profile = {
  fname: "",
  lname: "",
  gender: "",
  age: "",
  phone: "",
  city: "",
  description: ""
};

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...profile };
  }

  onSubmit = (event, authUser) => {
    const { fname, lname, gender, age, phone, city, description } = this.state;

    this.props.firebase.user(authUser.uid).update({
      fname,
      lname,
      gender,
      age,
      phone,
      city,
      description
    });

    this.props.history.push(ROUTES.PROFILE);

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { fname, lname, age, phone, city, gender } = this.state;
    const isInvalid =
      fname === "" ||
      lname === "" ||
      age === "" ||
      phone === "" ||
      city === "" ||
      gender === "";
    return (
      <CreateP>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <h1>Create Profile</h1>
              <form onSubmit={event => this.onSubmit(event, authUser)}>
                <label>
                  First name:
                  <input
                    name="fname"
                    value={this.state.fname}
                    onChange={this.onChange}
                    type="text"
                    placeholder="First name.."
                  />
                </label>
                <br />
                <br />
                <label>
                  Last name:
                  <input
                    name="lname"
                    value={this.state.lname}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Last name.."
                  />
                </label>
                <br />
                <br />
                <label>
                  Age:
                  <input
                    name="age"
                    value={this.state.age}
                    onChange={this.onChange}
                    type="number"
                    placeholder="Your age.."
                  />
                </label>
                <br />
                <br />
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                  >
                    <option value="" disabled default>
                      Choose gender
                    </option>
                    <option value="Other">Other</option>
                    <option value="Man">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
                <br />
                <br />
                <label>
                  Number: +46
                  <input
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                    type="number"
                    placeholder="Phone number.."
                  />
                </label>
                <br />
                <br />
                <label>
                  City:
                  <input
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Location.."
                  />
                </label>
                <br />
                <br />
                <label>
                  Descripion:
                  <textarea
                    rows="4"
                    cols="50"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    type="textarea"
                    placeholder="Write something about yourself.."
                  />
                </label>
                <br />
                <BtnContainer>
                  <Button disabled={isInvalid}>
                    <UserD />
                    <span> | </span>Create Profile
                  </Button>
                </BtnContainer>
              </form>
            </div>
          )}
        </AuthUserContext.Consumer>
      </CreateP>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(CreateProfile);
