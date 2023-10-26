import React from 'react'

const LodgingReadOnlyRow = ({ lodging, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
      <td>{lodging.checkInDate}</td>
      <td>{lodging.checkOutDate}</td>
      <td>{lodging.address}</td>
      <td>{lodging.price}</td>
      <td>{lodging.bookingLink}</td>
      <td>{lodging.notes}</td>
      <td>{lodging.confirmationNumber}</td>
      <td id="action-column">
        <button type="button" className="edit-btns" onClick={(event)=> handleEditClick(event, lodging)}>Edit</button>
        <button type="button" className="delete-btns" onClick={() => handleDeleteClick(lodging.lodgingId)}>Delete</button>
      </td>
    </tr>
  )
}

export default LodgingReadOnlyRow