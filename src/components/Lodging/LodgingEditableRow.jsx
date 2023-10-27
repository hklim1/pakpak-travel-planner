import React from 'react'

const LodgingEditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
        <td>
            <input type="text" placeholder="Check In Date" size="16" value={editFormData.checkInDate} name="checkInDate" onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Check Out Date" name="checkOutDate" size="16" value={editFormData.checkOutDate} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Address" name="address" size="16" value={editFormData.address} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Price" name="price" size="16" value={editFormData.price} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Booking Link" name="bookingLink" size="16" value={editFormData.bookingLink} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Notes" name="notes" size="16" value={editFormData.notes} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type="text" placeholder="Confirmation Number" name="confirmationNumber" size="16" value={editFormData.confirmationNumber}  onChange={handleEditFormChange}></input>
        </td>
        <td>
            <button type="submit" className="save-btns">Save</button>
            <button type="button" className="cancel-btns" onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
    )
}

export default LodgingEditableRow