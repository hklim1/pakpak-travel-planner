import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

import { getUserTrip } from "../../firebaseUtils";
import { useParams } from "react-router-dom";


export default function OrganizeDaySchedule() {
  const containers = ["Sandbox", "Day 1", "Day 2", "Day 3"];
  const [locations, setLocations] = useState({}); // where each draggable is
  // const [parent, setParent] = useState(null);
  const [activities, setActivities] = useState([]);
  const { tripId } = useParams();

  useEffect(() => {
    getUserTrip(tripId).then((userData) => {
      console.log(userData);
      setActivities(Object.values(userData["activities"]));
    });
  }, []);

  const draggables = activities.map((activity) => (
    <Draggable id={activity.activityId}>{activity.activityName}</Draggable>
  ));

  return (
    <div className="overall-box">
    <DndContext onDragEnd={handleDragEnd}>
      {draggables.filter((d) => !locations[d.props.id])}
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
