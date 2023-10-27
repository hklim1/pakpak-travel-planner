import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4} from 'uuid'

import { getUserTrip, addLodging, deleteLodging } from "../../firebaseUtils";
import LodgingReadOnlyRow from "./LodgingReadOnlyRow";
import LodgingEditableRow from "./LodgingEditableRow";

// import { LoggedUser } from "../../types";
// import { UserProvider } from "../../contexts/UserProvider";

export default function Lodging() {

    // return(
    //     <button onClick={newDb}>Click Me</button>
    // )
    // await setDoc(doc(db, "cities", "new-city-id"), data);

    const { tripId } = useParams();

    const [lodgings, setLodgings] = useState([]);
    const [addFormData, setAddFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        address: '',
        price: '',
        bookingLink: '',
        notes: '',
        confirmationNumber: ''
    })

    const [editFormData, setEditFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        address: '',
        price: '',
        bookingLink: '',
        notes: '',
        confirmationNumber: ''
    })

    const [editLodgingId, setEditLodgingId] = useState(null);

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

        const editedLodging = {
            lodgingId: editLodgingId,
            checkInDate: editFormData.checkInDate,
            checkOutDate: editFormData.checkOutDate,
            address: editFormData.address,
            price: editFormData.price,
            bookingLink: editFormData.bookingLink,
            notes: editFormData.notes,
            confirmationNumber: editFormData.confirmationNumber
        }

        const newLodgings = [...lodgings];

        const index = lodgings.findIndex((lodging) => lodging.lodgingId === editLodgingId);

        newLodgings[index] = editedLodging;

        addLodging(tripId, editedLodging)

        setLodgings(newLodgings);
        setEditLodgingId(null);

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
            checkInDate: '',
            checkOutDate: '',
            address: '',
            price: '',
            bookingLink: '',
            notes: '',
            confirmationNumber: ''
        }
        )
    }
    
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newLodging = {
            lodgingId: uuidv4(),
            checkInDate: addFormData.checkInDate,
            checkOutDate: addFormData.checkOutDate,
            address: addFormData.address,
            price: addFormData.price,
            bookingLink: addFormData.bookingLink,
            notes: addFormData.notes,
            confirmationNumber: addFormData.confirmationNumber
        }

        const newLodgings = [...lodgings, newLodging]
        setLodgings(newLodgings)

        addLodging(tripId, newLodging)

        clearForm();
    }

    const handleEditClick = (event, lodging) => {
        event.preventDefault();
        setEditLodgingId(lodging.lodgingId);

        const formValues = {
            checkInDate: lodging.checkInDate,
            checkOutDate: lodging.checkOutDate,
            address: lodging.address,
            price: lodging.price,
            bookingLink: lodging.bookingLink,
            notes: lodging.notes,
            confirmationNumber: lodging.confirmationNumber
        }

        setEditFormData(formValues);
    }

    useEffect(() => {
        getUserTrip(tripId).then((trip)=>{
            setLodgings(Object.values(trip['lodgings']))
    })
  }, []);

  console.log(lodgings)

  const handleCancelClick = () => {
    setEditLodgingId(null);
  }

  const handleDeleteClick = (lodgingId) => {
    const newLodgings = [...lodgings];

    const index = lodgings.findIndex((lodging) => lodging.lodgingId === lodgingId);

    newLodgings.splice(index, 1)

    setLodgings(newLodgings);

    deleteLodging(tripId, lodgingId)

  }

    return (
        <div className="lodging-container">
            <h4>Add a Lodging:</h4>
            <form id="addLodgingForm" onSubmit={handleAddFormSubmit}>
                <input type="date" name="checkInDate" value={addFormData.checkInDate} placeholder="Check In Date" size='19' onChange={handleAddFormChange}></input>
                <input type="date" name="checkOutDate" value={addFormData.checkOutDate} placeholder="Check Out Date" size='19' onChange={handleAddFormChange}></input>
                <input type="text" name="address" value={addFormData.address} required="required" placeholder="Address" size='19' onChange={handleAddFormChange}></input>
                <input type="text" name="price" size='19' value={addFormData.price} placeholder="Price" onChange={handleAddFormChange}></input>
                <input type="text" name="bookingLink" size='19' value={addFormData.bookingLink} placeholder="Booking Link" onChange={handleAddFormChange}></input>
                <input type="text" name="notes" size='19' value={addFormData.notes} placeholder="Notes" onChange={handleAddFormChange}></input>
                <input type="text" name="confirmationNumber" size='19' value={addFormData.confirmationNumber} placeholder="Confirmation #" onChange={handleAddFormChange}></input>
                <button className="add-btns" type="submit">Add</button>
            </form>
            <hr />
            <form onSubmit={handleEditFormSubmit}>
                <table className="lodging-table">
                    <thead>
                        <tr>
                            <th>Check-In Date</th>
                            <th>Check-Out Date</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th>Booking Link</th>
                            <th>Notes</th>
                            <th>Confirmation #</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lodgings.map((lodging) => (
                            <>
                                { editLodgingId === lodging.lodgingId ? <LodgingEditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> : <LodgingReadOnlyRow lodging={lodging} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>}
                            </>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
  )
}
