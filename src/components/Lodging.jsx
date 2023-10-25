import { useEffect } from "react";
import { firebaseDB } from "../firebaseUtils";
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { LoggedUser } from "../../types";
// import { UserProvider } from "../../contexts/UserProvider";

export default function LodgingYT() {

    useEffect(() => {
        const getData = async () => {
          const firebaseCollection = collection(firebaseDB, "Trips");
          const snapshot = await getDocs(firebaseCollection);
          const newData = snapshot.docs
                        .map((doc) => ({...doc.data(), id:doc.id }));
          console.log(newData)
        };
        getData();
      }, [])

    const firebaseConfig = {
        apiKey: "AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q",
        authDomain: "pakpak-cebea.firebaseapp.com",
        projectId: "pakpak-cebea",
        storageBucket: "pakpak-cebea.appspot.com",
        messagingSenderId: "347170407823",
        appId: "1:347170407823:web:04b1d5f2ab8953925037fa"
    };

    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    async function newDb() {
        await setDoc(doc(db, "Trips", `${localStorage['token']}`), {
            trips: []
          });
    }

    // return(
    //     <button onClick={newDb}>Click Me</button>
    // )
    // await setDoc(doc(db, "cities", "new-city-id"), data);

    const [lodgings, setLodgings] = useState();

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
                {/* <tr>
                    <td>10/11/23</td>
                    <td>10/19/23</td>
                    <td>31 Calle Don Carlos, Tijeras, NM</td>
                    <td>$987.11</td>
                    <td>bookinglink</td>
                    <td>Lots of bugs</td>
                    <td>#10481084</td>
                </tr> */}
                </tbody>
            </table>
        </div>
  )
}
