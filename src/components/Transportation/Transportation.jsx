import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4} from 'uuid'

import { getUserTrip, addVehicle, deleteVehicle } from "../../firebaseUtils";
import TransportationReadOnlyRow from "./TransportationReadOnlyRow";
import TransportationEditableRow from "./TransportationEditableRow";

// import { LoggedUser } from "../../types";
// import { UserProvider } from "../../contexts/UserProvider";

export default function Transportation() {

    const { tripId } = useParams();

    const [vehicles, setVehicles] = useState([]);
    const [addFormData, setAddFormData] = useState({
        companyAndCar: '',
        price: '',
        pickUpLocation: '',
        pickUpDateTime: '',
        dropOffLocation: '',
        dropOffDateTime: '',
        notes: '',
        confirmationNumber: ''
    })

    const [editFormData, setEditFormData] = useState({
        companyAndCar: '',
        price: '',
        pickUpLocation: '',
        pickUpDateTime: '',
        dropOffLocation: '',
        dropOffDateTime: '',
        notes: '',
        confirmationNumber: ''
    })

    const [editVehicleId, setEditVehicleId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData};

        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedVehicle = {

            vehicleId: editVehicleId,
            companyAndCar: editFormData.companyAndCar,
            price: editFormData.price,
            pickUpLocation: editFormData.pickUpLocation,
            pickUpDateTime: editFormData.pickUpDateTime,
            dropOffLocation: editFormData.dropOffLocation,
            dropOffDateTime: editFormData.dropOffDateTime,
            notes: editFormData.notes,
            confirmationNumber: editFormData.confirmationNumber
        }

        const newVehicles = [...vehicles];

        const index = vehicles.findIndex((vehicle) => vehicle.vehicleId === editVehicleId);

        newVehicles[index] = editedVehicle;

        addVehicle(tripId, editedVehicle)

        setVehicles(newVehicles);
        setEditVehicleId(null);

    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    function clearForm() {
        setAddFormData({
            companyAndCar: '',
            price: '',
            pickUpLocation: '',
            pickUpDateTime: '',
            dropOffLocation: '',
            dropOffDateTime: '',
            notes: '',
            confirmationNumber: ''
        }
        )
    }
    
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newVehicle = {

            vehicleId: uuidv4(),
            companyAndCar: addFormData.companyAndCar,
            price: addFormData.price,
            pickUpLocation: addFormData.pickUpLocation,
            pickUpDateTime: addFormData.pickUpDateTime,
            dropOffLocation: addFormData.dropOffLocation,
            dropOffDateTime: addFormData.dropOffDateTime,
            notes: addFormData.notes,
            confirmationNumber: addFormData.confirmationNumber
        }

        const newVehicles = [...vehicles, newVehicle]
        setVehicles(newVehicles)

        addVehicle(tripId, newVehicle)

        clearForm();
    }

    const handleEditClick = (event, vehicle) => {
        event.preventDefault();
        setEditVehicleId(vehicle.vehicleId);

        const formValues = {
            companyAndCar: vehicle.companyAndCar,
            price: vehicle.price,
            pickUpLocation: vehicle.pickUpLocation,
            pickUpDateTime: vehicle.pickUpDateTime,
            dropOffLocation: vehicle.dropOffLocation,
            dropOffDateTime: vehicle.dropOffDateTime,
            notes: vehicle.notes,
            confirmationNumber: vehicle.confirmationNumber
        }

        setEditFormData(formValues);
    }

    useEffect(() => {
        getUserTrip(tripId).then((trip)=>{
            setVehicles(Object.values(trip['transportation']))
    })
  }, []);


  const handleCancelClick = () => {
    setEditVehicleId(null);
  }

  const handleDeleteClick = (vehicleId) => {
    const newVehicles = [...vehicles];

    const index = vehicles.findIndex((vehicle) => vehicle.vehicleId === vehicleId);

    newVehicles.splice(index, 1)

    setVehicles(newVehicles);

    deleteVehicle(tripId, vehicleId)

  }

    return (
        <div className="vehicle-container">
            <h4>Add a Vehicle:</h4>
            <form id="addVehicleForm" onSubmit={handleAddFormSubmit}>
                <input type="text" name="companyAndCar" value={addFormData.companyAndCar} required="required" size='16' placeholder="Rental Co / Vehicle" onChange={handleAddFormChange}></input>
                <input type="text" name="price" size='16' value={addFormData.price} placeholder="Price" onChange={handleAddFormChange}></input>
                <input type="text" name="pickUpLocation" value={addFormData.pickUpLocation} placeholder="Pick Up Location" size='16' onChange={handleAddFormChange}></input>
                <input type="datetime-local" name="pickUpDateTime" value={addFormData.pickUpDateTime} placeholder="Pick Up Date/Time" size='16' onChange={handleAddFormChange}></input>
                <input type="text" name="dropOffLocation" size='16' value={addFormData.dropOffLocation} placeholder="Drop Off Location" onChange={handleAddFormChange}></input>
                <input type="datetime-local" name="dropOffDateTime" size='16' value={addFormData.dropOffDateTime} placeholder="Drop Off Date/Time" onChange={handleAddFormChange}></input>
                <input type="text" name="notes" size='16' value={addFormData.notes} placeholder="Notes" onChange={handleAddFormChange}></input>
                <input type="text" name="confirmationNumber" size='16' value={addFormData.confirmationNumber} placeholder="Confirmation #" onChange={handleAddFormChange}></input>
                <button className="add-btns" type="submit">Add</button>
            </form>
            <hr />
            <form onSubmit={handleEditFormSubmit}>
                <table className="vehicles-table">
                    <thead>
                        <tr>
                            <th>Company & Vehicle</th>
                            <th>Price</th>
                            <th>Pick Up Location</th>
                            <th>Pick Up Date / Time</th>
                            <th>Drop Off Location</th>
                            <th>Drop Off Date / Time </th>
                            <th>Notes</th>
                            <th>Conf #</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <>
                                { editVehicleId === vehicle.vehicleId ? <TransportationEditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> : <TransportationReadOnlyRow vehicle={vehicle} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>}
                            </>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
  )
}
