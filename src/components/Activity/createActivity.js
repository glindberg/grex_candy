import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";

import LocationPage from "../Map/location";
import { Creating, MapSize, Label, Form, Div } from "./styles";
import { BtnContainer } from "../Profile/styles";
import { Button } from "../Styles/button";
import { User, Run } from "../Styles/icons";

const INITIAL_STATE = {
  activity: "",
  otheractivity: "",
  dateforact: "",
  actlengthstart: "",
  actlengthend: "",
  activityname: "",
  intensity: "",
  details: "",
  other: "",
  markers: []
};

class CreateActivity extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  receiveMarker = marker => {
    this.setState({ markers: marker });
  };
  onSubmit = (event, authUser) => {
    const {
      activity,
      otheractivity,
      dateforact,
      actlengthstart,
      actlengthend,
      activityname,
      intensity,
      details,
      other,
      markers
    } = this.state;

    const members = [authUser.username];
    const chat = null;

    this.props.firebase.activities().push({
      activity,
      otheractivity,
      dateforact,
      actlengthstart,
      actlengthend,
      activityname,
      intensity,
      details,
      other,
      members,
      chat,
      markers,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    });

    this.props.history.push(ROUTES.ACTIVITY);
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      activityname,
      activity,
      dateforact,
      actlengthstart,
      actlengthend,
      intensity,
      details
    } = this.state;
    const isInvalid =
      activityname === "" ||
      activity === "" ||
      dateforact === "" ||
      actlengthstart === "" ||
      actlengthend === "" ||
      intensity === "" ||
      details === "";

    return (
      <Creating>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <h1>Create Activity</h1>
              <MapSize>
                <LocationPage createActivityView={this.receiveMarker} />
              </MapSize>
              <Div>
                <form onSubmit={event => this.onSubmit(event, authUser)}>
                  <Form>
                    <Label>
                      Activityname:
                      <input
                        name="activityname"
                        value={this.state.activityname}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Activity"
                        required
                      />
                    </Label>
                  </Form>
                  <br />
                  <Form>
                    <Label>
                      Type of Activity:
                      <select
                        name="activity"
                        value={this.state.activity}
                        onChange={this.onChange}
                        required
                      >
                        <option value="" disabled default>
                          Choose Activity
                        </option>
                        <option value="Running">Running</option>
                        <option value="Walking">Walking</option>
                        <option value="Hiking">Hiking</option>
                        <option value="Weight training">Weight Training</option>
                        <option value="Dancing">Dancing</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Mountain Biking">Mountain Biking</option>
                        <option value="Climbing">Climbing</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Walking dog">Walking dog</option>
                        <option value="Ice-skating">Ice-skating</option>
                        <option value="Skiing">Skiing</option>
                        <option value="Snowboarding">Snowboarding</option>
                        <option value="Skateboarding">Skateboarding</option>
                        <option value="Other">Other, specify below</option>
                      </select>
                      <input
                        rows="1"
                        cols="50"
                        name="otheractivity"
                        value={this.state.otheractivity}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Other activity"
                      />
                    </Label>
                  </Form>
                  <br />
                  <Form>
                    <Label>
                      Date of Activity:
                      <input
                        name="dateforact"
                        value={this.state.dateforact}
                        onChange={this.onChange}
                        type="date"
                        required
                      />
                    </Label>
                  </Form>
                  <br />
                  <Form>
                    <Label>
                      Start time for Activity:
                      <input
                        name="actlengthstart"
                        value={this.state.actlengthstart}
                        onChange={this.onChange}
                        type="time"
                        min="0:00"
                        max="23:59"
                        required
                      />
                    </Label>
                  </Form>
                  <Form>
                    <Label>
                      <br />
                      End time:
                      <input
                        name="actlengthend"
                        value={this.state.actlengthend}
                        onChange={this.onChange}
                        type="time"
                        min="0:00"
                        max="23:59"
                        required
                      />
                    </Label>
                  </Form>
                  <br />
                  <Form>
                    <Label>
                      Intensity (1 for low intensity, 5 for high intensity):
                      <select
                        name="intensity"
                        value={this.state.intensity}
                        onChange={this.onChange}
                        required
                      >
                        <option value="" disabled default>
                          Choose Intensity
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </Label>
                  </Form>
                  <br />
                  <Form>
                    <label>
                      Details/Place for Meeting:
                      <textarea
                        rows="4"
                        cols="50"
                        name="details"
                        value={this.state.details}
                        onChange={this.onChange}
                        type="textarea"
                        placeholder="Write the details here.."
                        required
                      />
                    </label>
                  </Form>
                  <br />
                  <Form>
                    <label>
                      Other:
                      <textarea
                        rows="4"
                        cols="50"
                        name="other"
                        value={this.state.other}
                        onChange={this.onChange}
                        type="textarea"
                        placeholder="Other information that might be important.."
                      />
                    </label>
                  </Form>
                  <br />
                  {/* disabled={isInvalid} detta ska med in i button */}
                  {/* <button
                    type="submit"
                    value={this.state.activityname}
                    onChange={this.onChange}
                  >
                    Create Activity
                  </button> */}
                  <BtnContainer>
                    <Button
                      type="submit"
                      value={this.state.activityname}
                      onChange={this.onChange}
                      disabled={isInvalid}
                    >
                      <Run />
                      {/* <User /> */}
                      <span> | </span>Create Activity
                    </Button>
                  </BtnContainer>
                </form>
              </Div>
            </div>
          )}
        </AuthUserContext.Consumer>
      </Creating>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(CreateActivity);
