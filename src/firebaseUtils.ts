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

  export async function getAllUserTrips() {
    const userId = localStorage['token']
    const docRef = doc(firebaseDB, 'Trips', userId);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data()?.['trips']
    return userData
  }

  export async function getUserTrip(_tripId) {
    const userId = localStorage['token']
    const docRef = doc(firebaseDB, 'Trips', userId);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data()?.['trips']
    
    for (let i=0; i < userData.length; i++){
      const tripId=userData[i]['tripId']
      if (tripId === _tripId) {
        console.log(userData[i])
        return userData[i]
      }
    }
  }

  export async function addLodging(_tripId, lodgingData) {
    const userId = localStorage['token']
    const userTrips = await getAllUserTrips()
    const userTrip = await getUserTrip(_tripId)
    
    const notImportantTrips: any = []
    for (let i=0; i < userTrips.length; i++){
      const tripId=userTrips[i]['tripId']
      if (tripId != _tripId) {
        notImportantTrips.push(userTrips[i])
      }
    }

    userTrip['lodgings'].push(lodgingData)

    const tripsRef = doc(firebaseDB, 'Trips', userId);

    await updateDoc(tripsRef, {
      trips: [...notImportantTrips, userTrip] 
    })
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