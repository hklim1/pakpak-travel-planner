import { useState } from "react";
import DayPlan from '../components/DayPlan';
import Lodging from '../components/Lodging';

export default function PlanningPage() {
  const [showLodging, setShowLodging] = useState(false);
  const [showTransportation, setShowTransportation] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const onClickLodging = () => {
    setShowLodging(true);
    setShowTransportation(false);
    setShowActivities(false);
    setShowMap(false);
  }

  const onClickTransportation = () => {
    setShowTransportation(true);
    setShowLodging(false)
    setShowActivities(false);
    setShowMap(false);
  }

  const onClickActivities = () => {
    setShowTransportation(false);
    setShowLodging(false)
    setShowActivities(true);
    setShowMap(false);
  }

  const onClickMap = () => {
    setShowTransportation(false);
    setShowLodging(false)
    setShowActivities(false);
    setShowMap(true);
  }
  
  const Lodging1 = () => (
    <>
    <div className="triangle"></div>
    <div className='planning-page-divs'>
      <Lodging />
    </div>
    </>
  )

  const Transportation = () => (
    <>
    <div className='triangle-transport'></div>
    <div className='planning-page-divs'>
      <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
    </div>
    </>
  )

  const Activities = () => (
    <>
    <div className='triangle-activities'></div>
    <div className='planning-page-divs'>
      <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
      <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
    </div>
    </>
  )

  const Map = () => (
    <>
    <div className='triangle-map'></div>
    <div className='planning-page-divs'>
      <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
      <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
      <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
    </div>
    </>
  )

  return (
    <>
    <div className='planning-buttons'>
      <button className={showLodging ? 'active-button' : undefined} onClick={onClickLodging}>LODGING</button>
      <button className={showTransportation ? 'active-button' : undefined} onClick={onClickTransportation}>TRANSPORTATION</button>
      <button className={showActivities ? 'active-button' : undefined} onClick={onClickActivities}>ACTIVITIES</button>
      <button className={showMap ? 'active-button' : undefined} onClick={onClickMap}>MAP</button>
      <div className="mini-screen">
        { showLodging && <Lodging1 /> }
        { showTransportation && <Transportation/>}
        { showActivities && <Activities />}
        { showMap && <Map />}
      </div>
    </div>
    </>
  )
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

