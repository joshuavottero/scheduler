import React, {useState} from "react";
import InterviewerListItem from "./InterviewerListItem";
import './InterviewerListItem.scss';
export default function InterviewerList(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer);
  const interviewers = props.interviewers.map((person) => {
    return (
      <InterviewerListItem 
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={person.id === interviewer}
        //props.setInterviewer(props.id)
      setInterviewer={() => console.log("id set to",person.id)}
      />  
    );
  });
  
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
      
    </section>
    
  );
}