import { initializeApp } from "firebase/app";
import { doc, deleteDoc } from "firebase/firestore";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q",
  authDomain: "pakpak-cebea.firebaseapp.com",
  projectId: "pakpak-cebea",
  storageBucket: "pakpak-cebea.appspot.com",
  messagingSenderId: "347170407823",
  appId: "1:347170407823:web:04b1d5f2ab8953925037fa",
};

// Initialize Firebase
export const initFirebase = () => initializeApp(firebaseConfig);

export const firebaseDB = getFirestore(initFirebase());

export async function getFirebaseUser(userId: string) {
  const docRef = doc(firebaseDB, "Trips", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    localStorage.setItem("tripData", JSON.stringify(docSnap.data()));
  } else {
    // docSnap.data() will be undefined in this case
    await setDoc(doc(firebaseDB, "Trips", `${localStorage["token"]}`), {
      trips: [],
    });
    localStorage.setItem(
      "tripData",
      JSON.stringify({
        trips: [],
      })
    );
    console.log("Creating Doc for New User");
  }
}

export async function getAllUserTrips() {
  const userId = localStorage["token"];
  const docRef = doc(firebaseDB, "Trips", userId);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data()?.["trips"] ?? [];
  return userData;
}

export async function getUserTrip(_tripId) {
  const userId = localStorage["token"];
  const docRef = doc(firebaseDB, "Trips", userId);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data()?.["trips"];

  for (let i = 0; i < userData.length; i++) {
    const tripId = userData[i]["tripId"];
    if (tripId === _tripId) {
      console.log(userData[i]);
      return userData[i];
    }
  }
}

// =========================== CRUD OPERATIONS FOR USER ===========================================

export async function deleteUser() {
  await deleteDoc(doc(firebaseDB, "Trips", `${localStorage['token']}`));
}

// =========================== CRUD OPERATIONS FOR LODGING ========================================

export async function addLodging(_tripId, lodgingData) {
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);

  const notImportantTrips: any = [];
  for (let i = 0; i < userTrips.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }

  userTrip["lodgings"] = {
    ...userTrip["lodgings"],
  };

  userTrip["lodgings"][lodgingData.lodgingId] = lodgingData;

  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

export async function editLodging(_tripId, lodgingData) {
  const lodgingId = lodgingData.lodgingId;
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);
  const tripLodgings = userTrip["lodgings"];

  const notImportantTrips: any = [];

  for (let i = 0; i < tripLodgings.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }

  userTrip["lodgings"][lodgingId] = { ...lodgingData };

  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

export async function deleteLodging(_tripId, lodgingId) {
  // TO GET TRIP:
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);
  const tripLodgings = userTrip["lodgings"];

  const notImportantTrips: any = [];

  for (let i = 0; i < tripLodgings.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }
  // ALL THAT WAS FOR TRIP

  // DELETE LODGING USING LODGING ID
  delete userTrip["lodgings"][lodgingId];

  // UPDATE TRIPS AFTER DELETION
  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

// ======================= CRUD OPERATIONS FOR ACTIVITIES ============================

export async function addActivity(_tripId, activityData) {
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);

  const notImportantTrips: any = [];
  for (let i = 0; i < userTrips.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }

  userTrip["activities"] = {
    ...userTrip["activities"],
  };

  userTrip["activities"][activityData.activityId] = activityData;

  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

export async function updateActivities(_tripId, allActivityData) {
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);

  const notImportantTrips: any = [];
  for (let i = 0; i < userTrips.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }

  userTrip["activities"] = {
    ...userTrip["activities"],
  };

  userTrip["activities"] = allActivityData;

  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

export async function deleteActivity(_tripId, activityId) {
  // TO GET TRIP:
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);
  const tripActivities = userTrip["activities"];

  const notImportantTrips: any = [];

  for (let i = 0; i < tripActivities.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }

  delete userTrip["activities"][activityId];

  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

// ======================= CRUD OPERATIONS FOR ACTIVITIES ============================

export async function addVehicle(_tripId, vehicleData) {
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);

  const notImportantTrips: any = [];
  for (let i = 0; i < userTrips.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }

  userTrip["transportation"] = {
    ...userTrip["transportation"],
  };

  userTrip["transportation"][vehicleData.vehicleId] = vehicleData;

  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

export async function deleteVehicle(_tripId, vehicleId) {
  const userId = localStorage["token"];
  const userTrips = await getAllUserTrips();
  const userTrip = await getUserTrip(_tripId);
  const tripVehicles = userTrip["transportation"];

  const notImportantTrips: any = [];

  for (let i = 0; i < tripVehicles.length; i++) {
    const tripId = userTrips[i]["tripId"];
    if (tripId != _tripId) {
      notImportantTrips.push(userTrips[i]);
    }
  }

  delete userTrip["transportation"][vehicleId];

  const tripsRef = doc(firebaseDB, "Trips", userId);

  await updateDoc(tripsRef, {
    trips: [...notImportantTrips, userTrip],
  });
}

// ================================ CREATE NEW TRIP ==========================================

export async function createNewTrip(_id, _tripName, _startDate, _endDate) {
  const newTrip = doc(firebaseDB, "Trips", `${localStorage["token"]}`);
  const allUsersTrips = await getAllUserTrips();

  allUsersTrips.push({
    tripId: _id,
    tripName: _tripName,
    startDate: _startDate,
    endDate: _endDate,
    activities: {},
    lodgings: {},
    transportation: {},
  });

  await updateDoc(newTrip, {
    trips: allUsersTrips,
  });
}
