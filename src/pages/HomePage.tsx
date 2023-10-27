import { IceCream, BookHeart, Sheet, Map } from "lucide-react";

import yellowBlobs from "../assets/yellow-blobs.png";
import headingText from "../assets/headingText.png";
import travelImage from "../assets/travelImg.png";
// import circleAndRectangle from "../assets/circleAndRectangle.png";
import weirdShapes from "../assets/weirdShapes.png";
import yellowSquare from "../assets/yellowSquare.png";
import halfRoundedRectangle from "../assets/halfRoundedRectangle.png";

export default function HomePage() {
  return (
    <>
      {/* <div className="parent-container"> */}
      <div className="top-container">
        <div className="other-container">
          <div className="text-container">
            <div className="main-text">
              <img src={headingText} alt={"plan-your-adventure"} />
            </div>
            <div className="parallelogram"></div>
            <div className="left-img">
              <img src={yellowSquare} alt={"yellow circle and rectangle"} />
            </div>
            <div className="sub-text">
              <p>
                Easily organize your lodging, transportation, and activity plans
                for vacations & road trips - all in one website
              </p>
              <a href="/login">
                <button id="other-login-btn">Get Started</button>
              </a>
            </div>
          </div>
          <div id="heroImg">
            <div className="imageContainer">
              <div id="yellowBlobs">
                <img
                  id="yellow-blob-img"
                  src={yellowBlobs}
                  alt={"abstract-yellow-shapes"}
                />
              </div>
              <div id="travelImage">
                <img src={travelImage} alt={"plane, globe, passport"} />
              </div>
            </div>
          </div>
        </div>
        <div className="second-container">
          <div id="yellowHalfRoundedRectangle">
            <img
              id="half-rectangle-img"
              src={halfRoundedRectangle}
              alt={"half rounded rectangle"}
              height={"400px"}
            />
          </div>
          <div id="weird-shapes-container">
            <img
              id="weird-shapes-img"
              src={weirdShapes}
              alt={"different shapes"}
              height={"250px"}
            />
          </div>
          <div className="image-holder">
            <div className="info-card">
              <div className="info-card-icon-r">
                <Sheet size={55} />
              </div>
              <h5>Cool Tables</h5>
              <p>
                Table layouts ensure that you never forget a detail for any part
                of your trip
              </p>
            </div>
            <div className="info-card">
              <div className="info-card-icon-g">
                <IceCream size={55} />
              </div>
              <h5>Worked Too Hard</h5>
              <p>
                I'm dumb and hard coded this whole thing in Vanilla CSS so it
                deserves to be used
              </p>
            </div>
            <div className="info-card">
              <div className="info-card-icon-r">
                <BookHeart size={55} />
              </div>
              <h5>Drag and Drop</h5>
              <p>
                Drag and Drop feature enables seamless organization of
                activities for every day of your trip
              </p>
            </div>
            <div className="info-card">
              <div className="info-card-icon-g">
                <Map size={55} />
              </div>
              <h5>Google Maps</h5>
              <p>
                GoogleMaps API allows you to find interesting restaurants,
                attractions, and landmarks nearby
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
