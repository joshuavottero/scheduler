import { checkPropTypes } from "prop-types";
import React from "react";
import DayListItem from "./DayListItem";


export default function Button(props) {
  const listDays = props.days.map((day) => {
    return (<DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={props.setDay}
    />
    );
  }
  );
  return (
    <ul>
      {listDays}
    </ul>
   );
}

