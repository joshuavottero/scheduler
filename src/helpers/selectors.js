

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

// export function getInterviewersForDay(state, day) {
//   let interviewersArray = [];
//   const appointmentsForDay = state.days.filter(days => days.name === day);
//   //console.log("day",appointmentsForDay)
//   //console.log(state)
//   if (appointmentsForDay.length > 0) {
//     //console.log("app",appointmentsForDay[0].appointments)
//     for (const appointment of appointmentsForDay[0].appointments) {
//       if(state.appointments[appointment].interview !== null) {
//         console.log("good");
//         console.log("days",state.days)
//         console.log("state",state.interviewers.id)
//         for(const interviwer in state.interviewers.id) {
//           console.log("app int",state.appointments[appointment].interview.interviewer);
//           console.log("int",interviwer);
//           console.log("final",state.interviewers[interviwer]);
//           console.log("bool", (state.appointments[appointment].interview.interviewer === interviwer))
//           if (state.appointments[appointment].interview.interviewer === interviwer) {
//             console.log("yay")
//             interviewersArray.push(state.interviewers[interviwer]);
//           }
//         }
        
//       }
     
//     }
//   }
  
//   return interviewersArray;
// }