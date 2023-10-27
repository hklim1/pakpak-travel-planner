// Google Maps API Key: AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q
// TERMINAL COMMANDS:
// npm i -D @types/google.maps
// npm install google-map-react

// import GoogleMapReact from "google-map-react";

export default function SimpleMap() {
  // const defaultProps = {
  //   center: {
  //     lat: 41.8781,
  //     lng: -87.6298,
  //   },
  //   zoom: 13,
  // };

  return (
    // NOTE FROM GMAPS: Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        style={{ width: "100%", height: "500" }}
      ></GoogleMapReact> */}
      <iframe
        width="100%"
        height="100%"
        style={{border:"0"}}
        loading="lazy"
        allowFullScreen={true}
        src="https://www.google.com/maps/embed/v1/search?q=restaurants&key=AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q"
      ></iframe>
    </div>
  );
}
