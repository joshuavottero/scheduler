

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