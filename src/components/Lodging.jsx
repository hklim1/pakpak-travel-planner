import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4} from 'uuid'

import { getUserTrip, addLodging } from "../firebaseUtils";

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

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData};

        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
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

    useEffect(() => {
        getUserTrip(tripId).then((trip)=>{
            setLodgings(trip['lodgings'])
    })
  }, []);

  console.log(lodgings)

    return (
        <div className="lodging-container">
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
                    </tr>
                </thead>
                <tbody>
                    {lodgings.map((lodging) => (
                        <tr>
                            <td>{lodging.checkInDate}</td>
                            <td>{lodging.checkOutDate}</td>
                            <td>{lodging.address}</td>
                            <td>{lodging.price}</td>
                            <td>{lodging.bookingLink}</td>
                            <td>{lodging.notes}</td>
                            <td>{lodging.confirmationNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
