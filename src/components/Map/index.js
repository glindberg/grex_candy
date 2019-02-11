import React from 'react';
import L from "leaflet"
import 'leaflet/dist/leaflet.css';
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${props => props.widht};
  height: ${props => props.height};
` 

export default class Map extends React.Component{
  componentDidMount(){
    this.map = L.map("map", {
      center: [59.3, 18.05],
      zoom: 11,
      zoomControl: false
    });
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxZoom: 20,
      maxNativeZoom: 17,
    }).addTo(this.map);
  }
  render(){
    return <Wrapper widht="100%" height="100vh" id="map"/>
  }
}