

 export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  const appointmentsForDay = state.days.filter(days => days.name === day);
  if (appointmentsForDay.length > 0) {
    for (const appointment of appointmentsForDay[0].appointments) {
      if (state.appointments[appointment]) {
        appointmentsArray.push(state.appointments[appointment]);
      }
    }
  }
  
  return appointmentsArray;
}

export function getInterview(state, interview) {
  let results = null;
  if(interview !== null && state !== null) {
    results = {};
    results.student = interview.student
    results.interviewer = state.interviewers[interview.interviewer];
    
    
  }
  return results;
}

export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  const appointmentsForDay = state.days.filter(days => days.name === day);
  if (appointmentsForDay.length > 0) {
    for (const interviewer of appointmentsForDay[0].interviewers) {
      if (state.interviewers[interviewer]) {
        interviewersArray.push(state.interviewers[interviewer]);
      }
    }
  }
  
  return interviewersArray;
}
