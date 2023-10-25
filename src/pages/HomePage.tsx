import yellowBlobs from "../assets/yellow-blobs.png";
import headingText from "../assets/headingText.png";
import travelImage from "../assets/travelImg.png";
import circleAndRectangle from "../assets/circleAndRectangle.png";
import yellowSquare from "../assets/yellowSquare.png";

export default function HomePage() {
  return (
    <>
      <div className="top-container">
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
            <button id="other-login-btn">Get Started</button>
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
    </>
  );
}
