// Google Maps API Key: AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q
// TERMINAL COMMANDS:
// npm i -D @types/google.maps
// npm install google-map-react

import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat:41.8781,
      lng: -87.6298,
    },
    zoom: 13,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        style={{ width: "100%", height: "500" }}
      ></GoogleMapReact>
    </div>
  );
}
