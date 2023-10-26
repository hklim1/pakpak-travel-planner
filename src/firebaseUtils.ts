import { initializeApp } from "firebase/app";
import { Timestamp, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q",
    authDomain: "pakpak-cebea.firebaseapp.com",
    projectId: "pakpak-cebea",
    storageBucket: "pakpak-cebea.appspot.com",
    messagingSenderId: "347170407823",
    appId: "1:347170407823:web:04b1d5f2ab8953925037fa"
  };
  
  // Initialize Firebase
  export const initFirebase = () => initializeApp(firebaseConfig);
  
  export const firebaseDB = getFirestore(initFirebase());

  export async function getFirebaseUser(userId: string) {
    const docRef = doc(firebaseDB, 'Trips', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      localStorage.setItem("tripData", JSON.stringify(docSnap.data()))
    } else {
      // docSnap.data() will be undefined in this case
      await setDoc(doc(firebaseDB, "Trips", `${localStorage['token']}`), {
        trips: []
      });
      localStorage.setItem("tripData", JSON.stringify({
        trips: []
      }));
      console.log("Creating Doc for New User")
    }
  }

  export async function createNewTrip(_id, _tripName, _startDate, _endDate){
    const newTrip = doc(firebaseDB, "Trips", `${localStorage['token']}`);

    await updateDoc(newTrip, {
      trips: [
        {tripId: _id,
        tripName: _tripName,
        startDate: _startDate,
        endDate: _endDate}
      ]
    });
  }