import React, { Component } from "react";
import { geolocated } from "react-geolocated";

class Located extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      userCoords: null
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

  updateUserPosition = (userId, lat, lng) => {
    console.log("DB HIT!");
    if (userId) {
      this.props.firebase.user(userId).update({
        position: { lat: lat, lng: lng },
        editedAt: this.props.firebase.serverValue.TIMESTAMP
      });
    }
  };

  getUserLastPosition = userId => {
    this.props.firebase.user(userId).once("value", snapshot => {
      const usersObject = snapshot.val();
      if (usersObject) {
        this.setState({
          userCoords: usersObject.position
        });
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    this.getUserLastPosition(this.props.authUser);

    if (nextProps.coords && this.state.userCoords) {
      const { latitude: lat1, longitude: lng1 } = nextProps.coords;
      const { lat: lat2, lng: lng2 } = this.state.userCoords;

      const dist = this.calculateDistance(lat1, lng1, lat2, lng2);
      this.setState({
        coords: {
          lat: lat1,
          lng: lng1
        }
      });
      if (dist > 1) {
        this.updateUserPosition(nextProps.authUser, lat1, lng1);
        this.getUserLastPosition(nextProps.authUser.uid);
        this.setState({ userCoords: null });
      }
    }
  }
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>Location updated</div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  watchPosition: true,
  userDecisionTimeout: 5000
})(Located);
