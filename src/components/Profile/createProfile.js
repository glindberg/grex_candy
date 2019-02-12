import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { AuthUserContext, withAuthorization } from "../Session";

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

    this.props.firebase.profiles().push({
      userId: authUser.uid,
      fname,
      lname,
      gender,
      age,
      phone,
      city,
      description
    });

    this.props.firebase
      .profile(fname, lname, gender, age, phone, city, description)
      .then(() => {
        this.setState({ ...profile });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { fname, lname, age, phone, city } = this.state;

    const isInvalid =
      fname === "" || lname === "" || age === "" || phone === "" || city === "";
    return (
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
              <label>
                Gender:
                <select
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                >
                  <option value="Other">Other</option>
                  <option value="Man">Man</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <br />
              <label>
                Phone number: +46
                <input
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  type="number"
                  placeholder="Phone number.."
                />
              </label>
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
              <button disabled={isInvalid} type="submit">
                Create Profile
              </button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(CreateProfile);
