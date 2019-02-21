import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

const LocationPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Location userId={authUser.uid} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

class LocatedTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      browserCoords: null,
      dbCoords: null
    };
  }

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return Math.round(d * 1000);
  };

  updatePosition = position => {
    this.setState({
      browserCoords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
    if (position.coords && this.state.dbCoords) {
      const { latitude: lat1, longitude: lng1 } = position.coords;
      const { latitude: lat2, longitude: lng2 } = this.state.dbCoords;
      const dist = this.calculateDistance(lat1, lng1, lat2, lng2);
      if (dist > 1) {
        this.writeUserPositionToDB(position.coords);
      }
    }
  };

  getUserPositionFromDB = () => {
    this.props.firebase
      .user(this.props.userId)
      .child("position")
      .once("value", snapshot => {
        const userPosition = snapshot.val();
        this.setState({ dbCoords: userPosition });
      });
  };

  writeUserPositionToDB = position => {
    const { latitude, longitude } = position;

    this.props.firebase
      .user(this.props.userId)
      .update({ position: { latitude: latitude, longitude: longitude } });
    this.setState({ dbCoords: position });
    this.getUserPositionFromDB();
  };

  componentDidMount() {
    this.getUserPositionFromDB();
    this.watchId = navigator.geolocation.watchPosition(
      this.updatePosition,
      error => {
        console.log("error" + error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1
      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const markers = [];
    markers.push(this.state.browserCoords);
    return (
      <div>
        {this.state.browserCoords ? (
          <MyMap
            markers={markers}
            position={Object.values(this.state.browserCoords)}
            zoom={13}
          />
        ) : null}
      </div>
    );
  }
}

const MyMap = props => (
  <Map
    zoomControl={false}
    scrollWheelZoom={true}
    center={props.position}
    zoom={props.zoom}
  >
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    />
    {props.markers.map((marker, index) => (
      <Marker key={index} position={Object.values(marker)}>
        <Popup>
          Position of me.
          <br />
        </Popup>
      </Marker>
    ))}
  </Map>
);

const Location = withFirebase(LocatedTwo);

export default LocationPage;
