import React from "react";
import './styles.scss'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status";
import {useVisualMode} from "hooks/useVisualMode"; 
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(function (err) {
      transition(ERROR_SAVE, true)
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    });
    
  }

  function deleteAppointment(id) {
    transition(DELETING);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(function (err) {
      transition(ERROR_DELETE, true)
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    });
  } 
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          id={props.id}
        />
      )}
      {mode === CREATE && <Form id={props.id} onSave={save}  
      onCancel={() => back()} interviewers={props.interviewers}/>} 
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={() => back()} id={props.id} onConfirm={deleteAppointment} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} id={props.id} onSave={save} onCancel={() => back()} interviewers={props.interviewers}/>}
      {mode === ERROR_SAVE && <Error onClose={() => back()} id={props.id}/>}
      {mode === ERROR_DELETE && <Error onClose={() => back()} id={props.id}/>}

    </article>
  );
  
}