import React from 'react'

const ActivitiesEditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
        <td>
            <input type="text" placeholder="Name/Description" size="14" value={editFormData.activityName} name="activityName" onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Address" name="address" size="14" value={editFormData.address} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="date" placeholder="Date" name="date" size="14" value={editFormData.date} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="time" placeholder="Time" name="time" size="14" value={editFormData.time} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Price" name="price" size="14" value={editFormData.price} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Duration" name="duration" size="14" value={editFormData.duration} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Notes" name="notes" size="14" value={editFormData.notes} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Confirmation Number" size="14" name="confirmationNumber" value={editFormData.confirmationNumber}  onChange={handleEditFormChange}></input>
        </td>
        <td>
            <button type="submit" className="save-btns">Save</button>
            <button type="button" className="cancel-btns" onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
    )
}

export default ActivitiesEditableRow;