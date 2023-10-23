import React, { useState } from "react";
import DayPlan from '../components/DayPlan'

export default function PlanningPage() {
  const [showLodging, setShowLodging] = useState(false);
  
  return (
    <>
    <div className='planning-buttons'>
      <button>LODGING</button>
      <button>TRANSPORTATION</button>
      <button>ACTIVITIES</button>
      <button></button>
      <div className='planning-page-divs'>
        <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
        <DayPlan date={new Date()} lodging='345 Xyz St., Irvine, CA' />
        <DayPlan date={new Date()} lodging='789 Qrs St., St. Louis, MO' />
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

