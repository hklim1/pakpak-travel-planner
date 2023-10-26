import { useEffect, useState } from "react";
import DayPlan from "../components/DayPlan";
import Overview from "../components/Overview";
import Lodging from "../components/Lodging";
import SimpleMap from "../components/Map";
import LodgingYT from "../components/Lodging.jsx";
import { useParams } from "react-router-dom";
import { getUserTrip } from "../firebaseUtils.js";

export default function PlanningPage() {
  const { tripId } = useParams();

  const [showOverview, setShowOverview] = useState(false);
  const [showLodging, setShowLodging] = useState(false);
  const [showTransportation, setShowTransportation] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [tripName, setTripName] = useState('');

  useEffect(() => {
    getUserTrip(tripId).then((trip)=>{
      setTripName(trip['tripName'])
    })
  }, []);

  const onClickOverview = () => {
    setShowOverview(true);
    setShowLodging(false);
    setShowTransportation(false);
    setShowActivities(false);
    setShowMap(false);
  };

  const onClickLodging = () => {
    setShowOverview(false);
    setShowLodging(true);
    setShowTransportation(false);
    setShowActivities(false);
    setShowMap(false);
  };

  const onClickTransportation = () => {
    setShowOverview(false);
    setShowTransportation(true);
    setShowLodging(false);
    setShowActivities(false);
    setShowMap(false);
  };

  const onClickActivities = () => {
    setShowOverview(false);
    setShowTransportation(false);
    setShowLodging(false);
    setShowActivities(true);
    setShowMap(false);
  };

  const onClickMap = () => {
    setShowOverview(false);
    setShowTransportation(false);
    setShowLodging(false);
    setShowActivities(false);
    setShowMap(true);
  };

  const Overview1 = () => (
    <>
      <div className="triangle-overview"></div>
      <div className="planning-page-divs">
        <Overview />
      </div>
    </>
  );

  const Lodging1 = () => (
    <>
      <div className="triangle"></div>
      <div className="planning-page-divs">
        {/* <Lodging /> */}
        <LodgingYT />
      </div>
    </>
  );

  const Transportation = () => (
    <>
      <div className="triangle-transport"></div>
      <div className="planning-page-divs">
        <DayPlan date={new Date()} lodging="123 Abc St., Chicago, IL" />
      </div>
    </>
  );

  const Activities = () => (
    <>
      <div className="triangle-activities"></div>
      <div className="planning-page-divs">
        <DayPlan date={new Date()} lodging="123 Abc St., Chicago, IL" />
        <DayPlan date={new Date()} lodging="123 Abc St., Chicago, IL" />
      </div>
    </>
  );

  const Map = () => (
    <>
      <div className="triangle-map"></div>
      <div className="planning-page-divs">
        <SimpleMap />
      </div>
    </>
  );


  return (
    <>
      <div className="planning-buttons">
        <h2>{`Planning for: ${tripName}`}</h2>
        {/* <p>{ tripId }</p> */}
        <button
          className={showLodging ? "active-button" : undefined}
          onClick={onClickLodging}
        >
          LODGING
        </button>
        <button
          className={showTransportation ? "active-button" : undefined}
          onClick={onClickTransportation}
        >
          TRANSPORTATION
        </button>
        <button
          className={showActivities ? "active-button" : undefined}
          onClick={onClickActivities}
        >
          ACTIVITIES
        </button>
        <button
          className={showOverview ? "active-button" : undefined}
          onClick={onClickOverview}
        >
          ORGANIZE
        </button>
        <button
          className={showMap ? "active-button" : undefined}
          onClick={onClickMap}
        >
          MAP
        </button>
        <div className="mini-screen">
          {showOverview && <Overview1 />}
          {showLodging && <Lodging1 />}
          {showTransportation && <Transportation />}
          {showActivities && <Activities />}
          {showMap && <Map />}
        </div>
      </div>
    </>
  );
}

// export default function PlanningPage() {
//   return (
//     <div className='planning-page-divs'>
//         <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
//         <DayPlan date={new Date()} lodging='345 Xyz St., Irvine, CA' />
//         <DayPlan date={new Date()} lodging='789 Qrs St., St. Louis, MO' />
//     </div>
//     // Only have opening & closing tag if you have children
//   )
// }
