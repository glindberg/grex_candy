import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import { MapPage } from "./styles";

const LocationPage = props => (
  <AuthUserContext.Consumer>
    {authUser => (
      <MapPage>
        <Location {...props} userId={authUser.uid} />
      </MapPage>
    )}
  </AuthUserContext.Consumer>
);

class LocatedTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      browserCoords: null,
      dbCoords: null,
      loading: false,
      activities: null
    };
  }
  getAllActivities = () => {
    this.setState({ loading: true });
    this.props.firebase.activities().on("value", snapshot => {
      const activityObject = snapshot.val();
      if (activityObject) {
        // convert messages list from snapshot
        const activityList = Object.keys(activityObject).map(key => ({
          ...activityObject[key],
          uid: key
        }));
        this.setState({
          activities: activityList,
          loading: false
        });
      } else {
        this.setState({ activities: null, loading: false });
      }
    });
  };
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
    this.getAllActivities();
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
    var markers = [];
    if (!this.props.createActivityView && this.state.activities) {
      markers = this.state.activities
        .filter(activity => activity.markers)
        .map(activity => ({
          ...activity.markers,
          name: activity.activity
        }));
    }
    markers.push({
      ...this.state.browserCoords,
      name: "This is your position"
    });
    return (
      <div>
        {this.state.browserCoords ? (
          <MyMap
            {...this.props}
            onClick={this.addMarker}
            markers={markers}
            position={Object.values(this.state.browserCoords)}
            zoom={13}
            sendMarker={this.props.createActivityView}
          />
        ) : (
          <span>No position of user</span>
        )}
      </div>
    );
  }
}

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
  }
  addMarker = e => {
    if (this.props.createActivityView) {
      const { markers } = this.state;
      markers[0] = e.latlng;

      this.setState({ markers });
      console.log(e.latlng);
      this.props.sendMarker(e.latlng);
    }
  };

  render() {
    const props = this.props;
    // const myIcon = {
    //   iconUrl: require("../Images/Female.png"),
    //   iconSize: [38, 95],
    //   iconAnchor: [22, 94],
    //   popupAnchor: [-3, -76]
    // };
    return (
      <Map
        zoomControl={false}
        scrollWheelZoom={true}
        center={props.position}
        zoom={props.zoom}
        onClick={this.addMarker}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {props.markers.map((marker, index) => (
          <Marker key={index} position={Object.values(marker)}>
            <Popup>
              {marker.name ? marker.name : "Placeholder"}
              <br />
            </Popup>
          </Marker>
        ))}
        {this.state.markers.map((marker, index) => (
          <Marker key={index} position={Object.values(marker)}>
            <Popup>
              I want to workout here! {this.state.markers.toString()}
              <br />
            </Popup>
            <Circle
              center={this.state.markers[index]}
              fillColor="BLUE"
              radius={500}
              color="red"
            >
              <Popup>Hej</Popup>
            </Circle>
          </Marker>
        ))}
      </Map>
    );
  }
}

const Location = withFirebase(LocatedTwo);

export default LocationPage;
