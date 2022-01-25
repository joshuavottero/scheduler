import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios"
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  });

  let dailyAppointments = [];

  const setDay = day => setState({...state, day});
  //const setDays = days => setState(prev => ({...prev, days}));
  
  useEffect(() => {
    //const Url = "http://localhost:8001/api/days"
    // axios.get(Url).then(response => {
    //   //setDays(response.data)
    // });

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

  function bookInterview(id, interview) {
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
     
  
      const newState = {
        ...state,
        appointments: newAppointments
      }
      setState(newState);
    })
    // .catch(function (err) {
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // });
  }

  function cancelInterview(id){

    return axios.delete(`/api/appointments/${id}`)
    .then(res => { 
      console.log("how");
      const Newinterview = null
    
      const newAppointment = { 
        ...state.appointments[id],
        interview: { ...Newinterview }
      };

      const newAppointments = {
        ...state.appointments,
        [id]: newAppointment
      };

      const newState = {
        ...state,
        appointments: newAppointments
      }
      setState(newState);
    })
    // .catch(function (err) {
    //   console.log(err.response.data);
    //   console.log(err.response.status);
    //   console.log(err.response.headers);
    // });
    
    

  }

  

  const appointments = getAppointmentsForDay(state, state.day); 
  const InterviewersForDay = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
      return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={InterviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
      );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* {listAppointments} */}
        {schedule}
      </section>
      
    </main>
  );
}
