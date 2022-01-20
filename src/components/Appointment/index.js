import React, {Fragment} from "react";
import './styles.scss'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {
  // console.log(props.interview.student);
  // console.log(props.interview);
  return(
    <article className="appointment">
      <Header time={props.time} />
      
      {props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
      {/* {(props.time && <span>Appointment at {props.time}</span>)}
      {(!props.time && <span>No Appointments</span>)} */}
    </article>
  );
}