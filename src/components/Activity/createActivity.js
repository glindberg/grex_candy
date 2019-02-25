import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";

import LocationPage from "../Map/location";

const INITIAL_STATE = {
  activity: "",
  otheractivity: "",
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
      actlengthstart,
      actlengthend,
      activityname,
      intensity,
      details,
      other,
      markers
    } = this.state;

    const members = [authUser.username];
    const chat = [""];
    //const markers = [""];

    this.props.firebase.activities().push({
      activity,
      otheractivity,
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
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Create Activity</h1>
            <form onSubmit={event => this.onSubmit(event, authUser)}>
              <label>
                Activityname:
                <input
                  name="activityname"
                  value={this.state.activityname}
                  onChange={this.onChange}
                  type="text"
                />
              </label>
              <label>
                Type of Activity:
                <select
                  name="activity"
                  value={this.state.activity}
                  onChange={this.onChange}
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
                <textarea
                  rows="1"
                  cols="50"
                  name="otheractivity"
                  value={this.state.otheractivity}
                  onChange={this.onChange}
                  type="textarea"
                  placeholder="Other activity"
                />
              </label>
              <br />
              <label>
                Start time for Activity:
                <input
                  name="actlengthstart"
                  value={this.state.actlengthstart}
                  onChange={this.onChange}
                  type="time"
                  min="0:00"
                  max="23:59"
                />
                End time:
                <input
                  name="actlengthend"
                  value={this.state.actlengthend}
                  onChange={this.onChange}
                  type="time"
                  min="0:00"
                  max="23:59"
                />
              </label>
              <br />
              <label>
                Intensity (1 for low intensity, 5 for high intensity):
                <select
                  name="intensity"
                  value={this.state.intensity}
                  onChange={this.onChange}
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
              </label>
              <br />
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
                />
              </label>
              <br />
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
              <br />
              {/* disabled={isInvalid} detta ska med in i button */}
              <button type="submit">Create Activity</button>
            </form>
            <LocationPage createActivityView={this.receiveMarker} />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

// class SimpleExample extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       markers: [[51.505, -0.09]]
//     };
//   }

//   addMarker = e => {
//     const { markers } = this.state;
//     markers.push(e.latlng);
//     this.setState({ markers });
//   };

//   render() {
//     return (
//       <Map center={[51.505, -0.09]} onClick={this.addMarker} zoom={13}>
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         />
//         {this.state.markers.map((position, idx) => (
//           <Marker key={`marker-${idx}`} position={position}>
//             <Popup>
//               <span>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//               </span>
//             </Popup>
//           </Marker>
//         ))}
//       </Map>
//     );
//   }
// }
const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(CreateActivity);
