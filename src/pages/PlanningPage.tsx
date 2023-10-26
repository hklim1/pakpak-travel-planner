import { useEffect, useState } from "react";
import DayPlan from "../components/DayPlan";
// import Overview from "../components/Overview"
import SimpleMap from "../components/Map";
import Lodging from "../components/Lodging/Lodging.jsx"
import Board from "../components/Organize/Board.jsx"
import KanbanBoard from "../components/DragDrop/KanbanBoard.js"
import { useParams } from "react-router-dom";
import { getUserTrip } from "../firebaseUtils.js";

export default function PlanningPage() {
  const { tripId } = useParams();

  const [showOrganize, setShowOrganize] = useState(false);
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

  const onClickOrganize = () => {
    setShowOrganize(true);
    setShowLodging(false);
    setShowTransportation(false);
    setShowActivities(false);
    setShowMap(false);
  };

  const onClickLodging = () => {
    setShowOrganize(false);
    setShowLodging(true);
    setShowTransportation(false);
    setShowActivities(false);
    setShowMap(false);
  };

  const onClickTransportation = () => {
    setShowOrganize(false);
    setShowTransportation(true);
    setShowLodging(false);
    setShowActivities(false);
    setShowMap(false);
  };

  const onClickActivities = () => {
    setShowOrganize(false);
    setShowTransportation(false);
    setShowLodging(false);
    setShowActivities(true);
    setShowMap(false);
  };

  const onClickMap = () => {
    setShowOrganize(false);
    setShowTransportation(false);
    setShowLodging(false);
    setShowActivities(false);
    setShowMap(true);
  };

  const Organize1 = () => (
    <>
      <div className="triangle-organize"></div>
      <div className="planning-page-divs">
        <KanbanBoard />
      </div>
    </>
  );

  const Lodging1 = () => (
    <>
      <div className="triangle"></div>
      <div className="planning-page-divs">
        {/* <Lodging /> */}
        <Lodging />
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
        <h2>{`❀ Planning for: ${tripName} ❀`}</h2>
        {/* <p>{ tripId }</p> */}
        <button
          id="top-lodging-btn"
          className={showLodging ? "active-button" : undefined}
          onClick={onClickLodging}
        >
          LODGING
        </button>
        <button
          id="top-transportation-btn"
          className={showTransportation ? "active-button" : undefined}
          onClick={onClickTransportation}
        >
          TRANSPORTATION
        </button>
        <button
          id="top-activities-btn"
          className={showActivities ? "active-button" : undefined}
          onClick={onClickActivities}
        >
          ACTIVITIES
        </button>
        <button
          id="top-organize-btn"
          className={showOrganize ? "active-button" : undefined}
          onClick={onClickOrganize}
        >
          ORGANIZE
        </button>
        <button
          id="top-map-btn"
          className={showMap ? "active-button" : undefined}
          onClick={onClickMap}
        >
          MAP
        </button>
        <div className="mini-screen">
          {showOrganize && <Organize1 />}
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
