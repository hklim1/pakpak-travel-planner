import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4} from 'uuid'

import { getUserTrip, addLodging } from "../../firebaseUtils";
import LodgingReadOnlyRow from "./LodgingReadOnlyRow";
import LodgingEditableRow from "./LodgingEditableRow";

// import { LoggedUser } from "../../types";
// import { UserProvider } from "../../contexts/UserProvider";

export default function LodgingYT() {

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
        price: 0,
        bookingLink: '',
        notes: '',
        confirmationNumber: ''
    })

    const [editFormData, setEditFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        address: '',
        price: 0,
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
            price: 0,
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
            setLodgings(trip['lodgings'])
    })
  }, []);

  console.log(lodgings)

  const handleCancelClick = () => {
    setEditLodgingId(null);
  }

    return (
        <div className="lodging-container">
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
                                { editLodgingId === lodging.lodgingId ? <LodgingEditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> : <LodgingReadOnlyRow lodging={lodging} handleEditClick={handleEditClick} />}
                            </>
                        ))}
                    </tbody>
                </table>
            </form>
            <h2>Add a Lodging</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="checkInDate" value={addFormData.checkInDate} placeholder="Check In Date" onChange={handleAddFormChange}></input>
                <input type="text" name="checkOutDate" value={addFormData.checkOutDate} placeholder="Check Out Date" onChange={handleAddFormChange}></input>
                <input type="text" name="address" value={addFormData.address} required="required" placeholder="Address" onChange={handleAddFormChange}></input>
                <input type="text" name="price" value={addFormData.price} placeholder="Price" onChange={handleAddFormChange}></input>
                <input type="text" name="bookingLink" value={addFormData.bookingLink} placeholder="Booking Link" onChange={handleAddFormChange}></input>
                <input type="text" name="notes" value={addFormData.notes} placeholder="Notes" onChange={handleAddFormChange}></input>
                <input type="text" name="confirmationNumber" value={addFormData.confirmationNumber} placeholder="Confirmation #" onChange={handleAddFormChange}></input>
                <button type="submit">Add</button>
            </form>
        </div>
  )
}
