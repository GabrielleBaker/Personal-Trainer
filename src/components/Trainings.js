//React imports
import React, {useState,useEffect} from 'react';
//Aggrid imports
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
//Mui imports
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
//daysjs import
import dayjs from 'dayjs';

export default function Trainings(){
    const[trainings,setTrainings]= useState([]);

    useEffect(() => {
        getTrainings()},[]);

    const[open,setOpen]=useState(false);

    //ag grid data
    const[columnDefs]=useState([
        {field:'date',valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD'),
         headerName: 'Date',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'duration',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'activity',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'customer.firstname',headerName: 'Firstname',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {field:'customer.lastname',headerName: 'Lastname',sortable:true,filtering:true, filter: 'agTextColumnFilter'},
        {cellRenderer: params=>
            <Button 
                color='error'
                onClick={()=> deleteTraining(params)}
            >
               <DeleteIcon size={1}/>
                </Button>
                , width:80, filtering:false,sortable:false},
    ])

    
    //delete a training
    const deleteTraining =(link)=>{
       console.log(link.data.id);
        if(window.confirm('Are you sure?')){
        fetch('http://traineeapp.azurewebsites.net/api/trainings/'+link.data.id,{
            method:'DELETE'})
        .then(response=>{
            if(response.ok){
                setOpen(true);
                getTrainings();
            }
            else{
                alert('Something went wrong in deletion');
            }
        })
        .catch(err=> console.log(err))
    }}

    //get all trainings
    const getTrainings = () =>{
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                alert('Something went wrong');
            }
        })
        .then(data => setTrainings(data))
        .catch(err=> console.error(err))
    }
    

    return(
          <>
          <h3 style={{margin:'auto', textAlign:'left', width:'90%'}}>
            Training Sessions
          </h3>
          <hr style={{ width:'90%'}}></hr>
        <div className='ag-theme-material'
        style={{width:'90%', height: 600, margin:'auto'}}
        >
            <AgGridReact
                rowSelection="single"
                rowData={trainings}
                animateRows= {true}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
        <Snackbar
                    open={open}
                    message="Training deleted successfully"
                    autoHideDuration={3000}
                    onClose={()=>setOpen(false)}
                />
        </>
    );
}
