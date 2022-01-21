import React, {useState} from "react";
import InterviewerListItem from "./InterviewerListItem";
import './InterviewerListItem.scss';
export default function InterviewerList(props) {
  //const [interviewer, setInterviewer] = useState(props.value);
  const interviewers = props.interviewers.map((value) => {
    return (
      <InterviewerListItem 
      key={value.id}
      name={value.name}
      avatar={value.avatar}
      
      selected={(value.id === props.interviewer)}
        //props.setInterviewer(props.id)
      setInterviewer={() => props.setInterviewer(value.id)}
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