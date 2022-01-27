import React, { useState, useEffect } from "react";
import axios from "axios"

export function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  const bookInterview = function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
      const Newinterview = {
        ...interview
      } 
      
  
      const newAppointment = { 
        ...state.appointments[id],
        interview: { ...Newinterview }
      };
  
      const newAppointments = {
        ...state.appointments,
        [id]: newAppointment
      };
      const newDays = updateSpots(state, newAppointments, id);
  
      const newState = {
        ...state,
        appointments: newAppointments,
        days: newDays
      }
      setState(newState);
    })
  }

  const cancelInterview = function cancelInterview(id){

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {     
      const newAppointment = { 
        ...state.appointments[id],
        interview:  null 
      };
  
      const newAppointments = {
        ...state.appointments,
        [id]: newAppointment
      };

      const newDays = updateSpots(state, newAppointments, id);
  
      const newState = {
        ...state,
        appointments: newAppointments,
        days: newDays
      }
      
      setState(newState);
    })
    // .catch(function (err) {
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // });
    
    
  
  }

  useEffect(() => {

    const dayUrl = "http://localhost:8001/api/days"
    const appointmentUrl = "http://localhost:8001/api/appointments"
    const interviewersUrl = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(dayUrl),
      axios.get(appointmentUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      const [days, appointments, interviewers] = all;
    });
  }, []);

  const updateSpots = function (state, appointments, id) {
    const stateCopy = [];
    let spots = 0;
    const dayID = (element) => element === id
    
    for (const day of state.days) {
      const copyDay = {...day};
      
      if(day.appointments.find(dayID)) {
        for(const appointmentID of day.appointments ) {
          if(appointments[appointmentID].interview === null) {
            spots++; 
          }
        }
        copyDay.spots = spots;
      }
      stateCopy.push(copyDay);
    } 
    
  
    return stateCopy;
     
  };
  return { state, setDay, bookInterview, cancelInterview, updateSpots}

}






