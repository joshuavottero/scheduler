import React from "react";
import './styles.scss'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import {useVisualMode} from "hooks/useVisualMode"; 

export default function Appointment(props) {
  // console.log(props.interview.student);
  // console.log(props.interview);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const emptyArray = [];
  return(
    <article className="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          //onAdd={transition(CREATE)}
        />
      )}
      {mode === CREATE && <Form  onCancel={() => back()} interviewers={emptyArray} />}

      {/* {props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty mode="EMPTY" />} */}
      {/* {(props.time && <span>Appointment at {props.time}</span>)}
      {(!props.time && <span>No Appointments</span>)} */}
    </article>
  );
}