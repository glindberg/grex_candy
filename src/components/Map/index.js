// import React, { Component } from "react";
// import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// class SimpleExample extends Component {
//   constructor() {
//     super();
//     this.state = {
//       markers: [[58, 18]]
//     };
//   }

//   addMarker = e => {
//     const { markers } = this.state;
//     markers.push(e.latlng);
//     this.setState({ markers });
//     console.log(e.latlng.toString());
//   };

//   render() {
//     return (
//   <Map center={[58, 18]} onClick={this.addMarker} zoom={13}>
//     <TileLayer
//       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//     />
// {
/* {this.state.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>This is a position.</span>
            </Popup>
          </Marker>
        ))} */
// }
//       </Map>
//     );
//   }
// }

// export default SimpleExample;
