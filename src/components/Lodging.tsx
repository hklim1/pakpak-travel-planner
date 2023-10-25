import { useEffect } from "react";
import { firebaseDB } from "../firebaseUtils";
import { collection, getDocs } from "firebase/firestore";
import Table from 'react-bootstrap/Table';


const Lodging = () => {
  useEffect(() => {
    const getData = async () => {
      const firebaseCollection = collection(firebaseDB, "Testing");
      const snapshot = await getDocs(firebaseCollection);
      const newData = snapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
      console.log(newData)
    };
    getData();
  }, [])
  return (
    <div className="lodging">
        <table className="lodging-table">
            <tr>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Address</th>
                <th>Price</th>
                <th>Booking Link</th>
                <th>Notes</th>
                <th>Confirmation #</th>
            </tr>
            <tr>
                <td>10/11/23</td>
                <td>10/19/23</td>
                <td>31 Calle Don Carlos, Tijeras, NM</td>
                <td>$987.11</td>
                <td>bookinglink</td>
                <td>Lots of bugs</td>
                <td>#10481084</td>
            </tr>
            <tr>
                <td>10/11/23</td>
                <td>10/19/23</td>
                <td>31 Calle Don Carlos, Tijeras, NM</td>
                <td>$987.11</td>
                <td>bookinglink</td>
                <td>Lots of bugs</td>
                <td>#10481084</td>
            </tr>
            <tr>
                <td>10/11/23</td>
                <td>10/19/23</td>
                <td>31 Calle Don Carlos, Tijeras, NM</td>
                <td>$987.11</td>
                <td>bookinglink</td>
                <td>Lots of bugs</td>
                <td>#10481084</td>
            </tr>
        </table>
    </div>
  )
}

export default Lodging;

// <Table striped bordered>
// <thead>
//   <tr>
//     <th>Check-In Date</th>
//     <th>Check-Out Date</th>
//     <th>Address</th>
//     <th>Price</th>
//     <th>Booking Link</th>
//     <th>Notes</th>
//     <th>Confirmation #</th>
//   </tr>
// </thead>
// <tbody>
//   <tr>
//     <td>10/11/23</td>
//     <td>10/19/23</td>
//     <td>31 Calle Don Carlos, Tijeras, NM</td>
//     <td>$987.11</td>
//     <td>bookinglink</td>
//     <td>Lots of bugs</td>
//     <td>#10481084</td>
//   </tr>
//   <tr>
//     <td>10/11/23</td>
//     <td>10/19/23</td>
//     <td>31 Calle Don Carlos, Tijeras, NM</td>
//     <td>$987.11</td>
//     <td>bookinglink</td>
//     <td>Lots of bugs</td>
//     <td>#10481084</td>
//   </tr>
// </tbody>
// </Table>