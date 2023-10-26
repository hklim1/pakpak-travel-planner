import React from 'react'

const LodgingReadOnlyRow = ({ lodging, handleEditClick }) => {
  return (
    <tr>
      <td>{lodging.checkInDate}</td>
      <td>{lodging.checkOutDate}</td>
      <td>{lodging.address}</td>
      <td>{lodging.price}</td>
      <td>{lodging.bookingLink}</td>
      <td>{lodging.notes}</td>
      <td>{lodging.confirmationNumber}</td>
      <td>
        <button type="button" onClick={(event)=> handleEditClick(event, lodging)}>Edit</button>
      </td>
    </tr>
  )
}

export default LodgingReadOnlyRow