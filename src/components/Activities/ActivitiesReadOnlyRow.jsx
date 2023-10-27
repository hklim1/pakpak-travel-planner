import React from 'react'

const ActivitiesReadOnlyRow = ({ activity, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
      <td>{activity.activityName}</td>
      <td>{activity.address}</td>
      <td>{activity.date}</td>
      <td>{activity.time}</td>
      <td>{activity.price}</td>
      <td>{activity.duration}</td>
      <td>{activity.notes}</td>
      <td>{activity.confirmationNumber}</td>
      <td id="action-column">
        <button type="button" className="edit-btns" onClick={(event)=> handleEditClick(event, activity)}>Edit</button>
        <button type="button" className="delete-btns" onClick={() => handleDeleteClick(activity.activityId)}>Delete</button>
      </td>
    </tr>
  )
}

export default ActivitiesReadOnlyRow;