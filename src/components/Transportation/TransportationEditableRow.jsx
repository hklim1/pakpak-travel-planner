import React from 'react'

const TransportationEditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
        <td>
            <input type="text" placeholder="Rental Company / Vehicle" size="14" value={editFormData.companyAndCar} name="companyAndCar" onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Price" name="price" size="14" value={editFormData.price} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Pick Up Location" name="pickUpLocation" size="14" value={editFormData.pickUpLocation} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="datetime-local" placeholder="Pick Up Date & Time" name="pickUpDateTime" size="14" value={editFormData.pickUpDateTime} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Drop Off Location" name="dropOffLocation" size="14" value={editFormData.dropOffLocation} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="datetime-local" placeholder="Drop Off Date & Time" name="dropOffDateTime" size="14" value={editFormData.dropOffDateTime} onChange={handleEditFormChange}></input>
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

export default TransportationEditableRow;