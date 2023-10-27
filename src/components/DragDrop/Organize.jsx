import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

import { getUserTrip } from "../../firebaseUtils";
import { useParams } from "react-router-dom";

function timeDiff(startDate, endDate) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(endDate);
  const secondDate = new Date(startDate);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  return diffDays;
}

export default function OrganizeDaySchedule() {
  const [locations, setLocations] = useState({}); // where each draggable is
  // const [parent, setParent] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState([]);
  const { tripId } = useParams();

  useEffect(() => {
    getUserTrip(tripId).then((userData) => {
      setActivities(Object.values(userData["activities"]));
      setStartDate(userData.startDate);
      setEndDate(userData.endDate);
    });
  }, []);

  const timeDifference = timeDiff(startDate, endDate);

  function makeContainerArray(aTimeDiff) {
    let container = [];
    for (let i = 0; i < aTimeDiff; i++) {
      container.push(`Day ${i + 1}`);
    }
    return container;
  }

  const containers = makeContainerArray(timeDifference);

  const draggables = activities.map((activity) => (
    <Draggable id={activity.activityId}>{activity.activityName}</Draggable>
  ));

  return (
    <div className="overall-box">
      <DndContext onDragEnd={handleDragEnd}>
        <Droppable key="Sandbox" id="Sandbox">
          <div className="header-top">
            <h1 class="organize-headers">Sandbox</h1>
          </div>
          {draggables.filter(
            (d) => !locations[d.props.id] || locations[d.props.id] === "Sandbox"
          )}
        </Droppable>
        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Droppable key={id} id={id}>
            <div className="header-top">
              <h1 class="organize-headers">{id}</h1>
            </div>
            {draggables.filter(
              (d) => locations[d.props.id] && locations[d.props.id] === id
            )}
          </Droppable>
        ))}
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const { over, active } = event;
    setLocations({
      ...locations,
      ...{ [active.id]: over.id },
    });
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    // setParent(over ? over.id : null);
  }
}
