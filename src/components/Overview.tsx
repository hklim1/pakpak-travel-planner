import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
// import { Link } from "react-router-dom"

import { firebaseDB } from "../firebaseUtils";
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Overview = () => {
  useEffect(() => {
    const getData = async () => {
      const firebaseCollection = collection(firebaseDB, "Trips");
      const snapshot = await getDocs(firebaseCollection);
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
    };
    getData();
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q",
    authDomain: "pakpak-cebea.firebaseapp.com",
    projectId: "pakpak-cebea",
    storageBucket: "pakpak-cebea.appspot.com",
    messagingSenderId: "347170407823",
    appId: "1:347170407823:web:04b1d5f2ab8953925037fa",
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(tripName, startDate, endDate);
  }

  return (
    <React.Fragment>
      <div className="overview-container">
        <div className="overview-wrapper">
          <form onSubmit={handleSubmit}>
            <h2 className="overviewH">Trip Details</h2>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="warning"
                label="Trip Name"
                onChange={(e) => setTripName(e.target.value)}
                value={tripName}
                fullWidth
                required
              />
            </Stack>
            <TextField
              type="date"
              variant="outlined"
              color="warning"
              label="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="date"
              variant="outlined"
              color="warning"
              label="End Date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <Button variant="outlined" color="warning" type="submit">
              Start Planning
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overview;
