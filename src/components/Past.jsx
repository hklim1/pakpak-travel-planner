import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getAllUserTrips } from "../firebaseUtils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IceCream,
  Scale,
  Sailboat,
  Map,
  Hammer,
  Apple,
  Package,
  Lamp,
  KeyRound,
  Rabbit,
  AlarmClock,
  Dog,
  Cat,
  PiggyBank,
  Bird,
  Crown,
  Snowflake,
  Magnet,
  Mail,
  Plane,
} from "lucide-react";

function generateRandomColor() {
  const colorArray = [
    '{backgroundColor: rgba(250, 216, 89, 0.7)}',
    '{backgroundColor: rgba(77, 175, 124, 0.3)}',
    '{backgroundColor: rgba(236, 100, 75, 0.3)}'
  ]

  const randomNumber = Math.random() * 3;
  const roundedRandomNumber = Math.floor(randomNumber);
  const bgColor = colorArray[roundedRandomNumber]
  return bgColor
}

function generateRandomIcon() {
  const iconArray = [
    IceCream,
    Scale,
    Sailboat,
    Map,
    Hammer,
    Apple,
    Package,
    Lamp,
    KeyRound,
    Rabbit,
    AlarmClock,
    Dog,
    Cat,
    PiggyBank,
    Bird,
    Crown,
    Snowflake,
    Magnet,
    Mail,
    Plane,
  ];
  const randomNumber = Math.random() * 20;
  const roundedRandomNumber = Math.floor(randomNumber);
  const ChosenIcon = iconArray[roundedRandomNumber]
  return < ChosenIcon size={120} />
}

const pastCardColorStyle = {
    backgroundColor: "yellow"
}

export default function PastTrips() {
  const [aUsersTrips, setAUsersTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUserTrips().then((userData) => {
      setAUsersTrips(userData.sort((a, b) => {
        const endDateTripA = new Date(a.endDate);
        const endDateTripB = new Date(b.endDate);
        const endDateTimeTripA = endDateTripA.getTime();
        const endDateTimeTripB = endDateTripB.getTime();
        if (endDateTimeTripA > endDateTimeTripB) {
          return 1
        }
        else if (endDateTimeTripA < endDateTimeTripB) {
          return -1
        }
        else {
          return 0
        }
      }));
    });
  }, []);

  function handleSubmit(aTripId) {
    navigate(`/edit/${aTripId}`);
  }

  console.log(aUsersTrips);

  return (
    <>
    <h1 id="past-trips-heading">{`${localStorage['userFirstName']}`}'s Past Trips</h1>
    <div className="past-trips-divs">
      {aUsersTrips.map((trip) => {
        return (
          <div className="past-whole-card">
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div className="past-card-icon-div">
              {generateRandomIcon()}
            </div>
            <div style={pastCardColorStyle} class="past-card-color">
            <Card.Body>
              <Card.Title>{trip.tripName}</Card.Title>
              <Card.Text>
                Your past trip to {trip.tripName} occurred between {" "}
                {trip.startDate} to {trip.endDate}
              </Card.Text>
              <Button
                variant="warning"
                onClick={() => {
                  handleSubmit(trip.tripId);
                }}
              >
                Edit Trip
              </Button>
            </Card.Body>
            </div>
          </Card>
          </div>
        );
      })}
    </div>
    </>
  );
}
