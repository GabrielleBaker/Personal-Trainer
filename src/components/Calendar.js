//React imports
import React,{useState,useEffect} from 'react';
//fullcalendar imports
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth';
//Mui imports
import Container from '@mui/material/Container';

// code adapted from
//https://fullcalendar.io/docs

function Calendar() {
    const [events, setEvents] = useState([{
        start: new Date(),
        end: new Date(),
        title: ''
    }])

    //get the customer & trainings data
    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings', {
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Error fetching data');
                }
            }).then(responseData => {
                let data = [];
                //https://www.w3schools.com/jsref/jsref_map.asp
                //map received data to a new array, use push to append items to the end
                responseData.map(item =>
                    //https://www.w3schools.com/jsref/jsref_push.asp
                    data.push(
                        {
                            start: item.date,
                            end: (item.date * 60000),
                            title: item.activity + 
                            ' / ' + item.customer.firstname + 
                            ' '+ item.customer.lastname,
                        }
                    )
                )
                //use the temporary array data to set events
                setEvents({ events: data })
            }).catch(err => console.error(err))
    }, [])
 
    return (
      <div>
        <Container
            sx={{
                backgroundColor:'white',
                maxWidth:'90%',
                margins:"auto" ,
                borderRadius: '25px',
                padding:3
                }}>
        <Fullcalendar
            plugins={[
                dayGridPlugin, 
                timeGridPlugin, 
                interactionPlugin,
                multiMonthPlugin
            ]}
            initialView={"dayGridMonth"}
            selectable='true'
            headerToolbar={{
                start: "today prev,next", 
                center: "title",
                end: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear", 
          }}
          events={events}
          
          height={"80vh"}
          
           />
      </Container>
      </div>
      
    );
  }
  
  export default Calendar;