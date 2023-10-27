import React from 'react'

const TransportationReadOnlyRow = ({ vehicle, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
      <td>{vehicle.companyAndCar}</td>
      <td>{vehicle.price}</td>
      <td>{vehicle.pickUpLocation}</td>
      <td>{vehicle.pickUpDateTime}</td>
      <td>{vehicle.dropOffLocation}</td>
      <td>{vehicle.dropOffDateTime}</td>
      <td>{vehicle.notes}</td>
      <td>{vehicle.confirmationNumber}</td>
      <td id="action-column">
        <button type="button" className="edit-btns" onClick={(event)=> handleEditClick(event, vehicle)}>Edit</button>
        <button type="button" className="delete-btns" onClick={() => handleDeleteClick(vehicle.vehicleId)}>Delete</button>
      </td>
    </tr>
  )
}

export default TransportationReadOnlyRow;