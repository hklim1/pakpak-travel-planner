import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4} from 'uuid'

import { getUserTrip, addActivity, deleteActivity } from "../../firebaseUtils";
import ActivitiesReadOnlyRow from "./ActivitiesReadOnlyRow";
import ActivitiesEditableRow from "./ActivitiesEditableRow";

// import { LoggedUser } from "../../types";
// import { UserProvider } from "../../contexts/UserProvider";

export default function Activities() {

    const { tripId } = useParams();

    const [activities, setActivities] = useState([]);
    const [addFormData, setAddFormData] = useState({
        activityName: '',
        address: '',
        date: '',
        time: '',
        price: '',
        duration: '',
        notes: '',
        confirmationNumber: ''
    })

    const [editFormData, setEditFormData] = useState({
        activityName: '',
        address: '',
        date: '',
        time: '',
        price: '',
        duration: '',
        notes: '',
        confirmationNumber: ''
    })

    const [editActivityId, setEditActivityId] = useState(null);

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

        const editedActivity = {

            activityId: editActivityId,
            activityName: editFormData.activityName,
            address: editFormData.address,
            date: editFormData.date,
            time: editFormData.time,
            price: editFormData.price,
            duration: editFormData.duration,
            notes: editFormData.notes,
            confirmationNumber: editFormData.confirmationNumber
        }

        const newActivities = [...activities];

        const index = activities.findIndex((activity) => activity.activityId === editActivityId);

        newActivities[index] = editedActivity;

        addActivity(tripId, editedActivity)

        setActivities(newActivities);
        setEditActivityId(null);

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
            activityName: '',
            address: '',
            date: '',
            time: '',
            price: '',
            duration: '',
            notes: '',
            confirmationNumber: ''
        }
        )
    }
    
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newActivity = {

            activityId: uuidv4(),
            activityName: addFormData.activityName,
            address: addFormData.address,
            date: addFormData.date,
            time: addFormData.time,
            price: addFormData.price,
            duration: addFormData.duration,
            notes: addFormData.notes,
            confirmationNumber: addFormData.confirmationNumber
        }

        const newActivities = [...activities, newActivity]
        setActivities(newActivities)

        addActivity(tripId, newActivity)

        clearForm();
    }

    const handleEditClick = (event, activity) => {
        event.preventDefault();
        setEditActivityId(activity.activityId);

        const formValues = {
            activityName: activity.activityName,
            address:  activity.address,
            date: activity.date,
            time: activity.time,
            price: activity.price,
            duration: activity.duration,
            notes: activity.notes,
            confirmationNumber: activity.confirmationNumber
        }

        setEditFormData(formValues);
    }

    useEffect(() => {
        getUserTrip(tripId).then((trip)=>{
            setActivities(Object.values(trip['activities']))
    })
  }, []);


  const handleCancelClick = () => {
    setEditActivityId(null);
  }

  const handleDeleteClick = (activityId) => {
    const newActivities = [...activities];

    const index = activities.findIndex((activity) => activity.activityId === activityId);

    newActivities.splice(index, 1)

    setActivities(newActivities);

    deleteActivity(tripId, activityId)

  }

    return (
        <div className="activity-container">
            <h4>Add an Activity:</h4>
            <form id="addActivityForm" onSubmit={handleAddFormSubmit}>
                <input type="text" name="activityName" value={addFormData.activityName} required="required" size='16' placeholder="Activity Name" onChange={handleAddFormChange}></input>
                <input type="text" name="address" value={addFormData.address} placeholder="Address" size='16' onChange={handleAddFormChange}></input>
                <input type="date" name="date" value={addFormData.date} placeholder="Date" size='16' onChange={handleAddFormChange}></input>
                <input type="time" name="time" size='16' value={addFormData.time} placeholder="Time" onChange={handleAddFormChange}></input>
                <input type="text" name="price" size='16' value={addFormData.price} placeholder="Price" onChange={handleAddFormChange}></input>
                <input type="text" name="duration" size='16' value={addFormData.duration} placeholder="Duration" onChange={handleAddFormChange}></input>
                <input type="text" name="notes" size='16' value={addFormData.notes} placeholder="Notes" onChange={handleAddFormChange}></input>
                <input type="text" name="confirmationNumber" size='16' value={addFormData.confirmationNumber} placeholder="Confirmation #" onChange={handleAddFormChange}></input>
                <button className="add-btns" type="submit">Add</button>
            </form>
            <hr />
            <form onSubmit={handleEditFormSubmit}>
                <table className="activities-table">
                    <thead>
                        <tr>
                            <th>Name / Desc</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Duration</th>
                            <th>Notes</th>
                            <th>Conf #</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <>
                                { editActivityId === activity.activityId ? <ActivitiesEditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> : <ActivitiesReadOnlyRow activity={activity} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>}
                            </>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
  )
}
