import DayPlan from '../components/DayPlan'

export default function PlanningPage() {
  return (
    <div className='planning-page-divs'>
        <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
        <DayPlan date={new Date()} lodging='345 Xyz St., Irvine, CA' />
        <DayPlan date={new Date()} lodging='789 Qrs St., St. Louis, MO' />
    </div>
    // Only have opening & closing tag if you have children
  )
}
// // Only have opening & closing tag if you have children
// DayPlan(date, '123 Abc St., Chicago, IL') {
//   return (
//     <DayPlan date={new Date()} lodging='123 Abc St., Chicago, IL' />
//     // Only have opening & closing tag if you have children
//   )
// }
