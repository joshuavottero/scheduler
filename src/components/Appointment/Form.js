import React, {useState} from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = function reset() {  
    setStudent("");
    setInterviewer("");
    setError("");
  }
  const cancel = function cancel(){
    reset();
    props.onCancel();
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student,interviewer)
  }
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
            /*
              This must be a controlled component
              your code goes here
            */
          />

          <section className="appointment__validation">{error}</section>
          <InterviewerList 
            value={props.interviewer}
            interviewer={interviewer}
            interviewers={props.interviewers}
            setInterviewer={setInterviewer}
          />
        </form>
     
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
    
  );
}