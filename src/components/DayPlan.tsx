interface DayPlanProps {
    date: Date
    lodging: string
}

export default function DayPlan({date, lodging}: DayPlanProps)  {
    return (
      <div className='day-plan'>
        <h5>{date.toDateString()}</h5>
        <img src='../src/assets/houseIcon.png' alt="house-icon" style={{maxWidth:'30px', maxHeight:'30px', paddingRight:'10px'}}/>
        <p style={{display:'inline-flex'}}>{lodging}</p>
        <h6>Activities</h6>
      </div>
    );
}