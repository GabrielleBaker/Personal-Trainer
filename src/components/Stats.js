//Rexcharts imports
import { 
  BarChart, 
  Bar,  
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
 } from 'recharts';
 //mui imports
import Container from '@mui/material/Container';
//react imports
import React, {useState,useEffect} from 'react';

//using 
//https://recharts.org/en-US --> bar chart
//https://lodash.com/  --> group by and sum by

export default function Statistics() {
//must require lodash to use
    let _ = require('lodash');

    const[inputData,setInputData]= useState([{}]);
    const[open,setOpen]=useState(false)
    const[data,setData]=useState([]);

  //get data from api
    const getData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert('Error fetching data');
            }
          })
          //map the fetched data to an array, must use .map to ensure
          //that we get the correct data 
          .then((data) => {
            //https://www.w3schools.com/jsref/jsref_map.asp
            setInputData(data.map((content)=>({
              activity: content.activity,
              duration: content.duration,
            })));
            setOpen(true);
          })
            .catch(err=> console.error(err))
        };

    useEffect(()=>{
        getData();
     },[])
    
   
        //once we've got the data in an array group data by activity
        if(open){
            const grouped = _.groupBy(inputData, 'activity');
            
            const chartData = [];
            //loop over activities in the grouped data, sum the duration and put it
            //into a temporary array which we use to set it into the final data const
            //https://www.w3schools.com/jsref/jsref_push.asp
            for(let activity in grouped){
              chartData.push({
                activity: activity,
                duration: _.sumBy(grouped[activity], 'duration')
              });
            }
          
            setData(chartData);
            setOpen(false);
          }
 
    


    return (
        <div>
            <h2>Statistics</h2>
        <Container 
            maxWidth="80%" 
            maxHeight="90%" 
            margin='auto'
            sx={{
                backgroundColor:'white',
                borderRadius: '25px',
                padding:3
            }}>
            <BarChart
            width={1050}
            height={550}
            data={data}
            margin={{
                top: 10,
                right: 50,
                left: 50,
                bottom: 5,
            }}
            >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </Container>
      </div>
    );
    
  
}
