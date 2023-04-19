//React imports
import React, { useEffect } from 'react';
//Mui imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//Mdi imports
import Icon from '@mdi/react';
import { mdiNotePlusOutline } from '@mdi/js';


export default function AddTraining(props){
    const [open, setOpen] = React.useState(false);
    const[ready,setReady]=React.useState(false);

   //the one customer we want to make a training for
    const [customer,setCustomer]=React.useState({
        firstname:'', 
        lastname:'', 
    });
    //the href we need to link customer and training
    const[customerLink,setCustomerLink]= React.useState('');
  
    //the new training
    const[training,setTraining]= React.useState({
        date:'',
        duration:'0',
        activity:'',
        customer:'',
    });
  
    //opening the dialog form 
    const handleClickOpen = () => {
        setOpen(true);

    //set customer name for input field 
    //(also doubles as a checker for correct customer called)
        setCustomer({
          firstname:props.params.firstname, 
          lastname:props.params.lastname,
        });

    //set customerlink (this link is what links the new training to the customer)
        setCustomerLink(props.params.links[0].href);
        
    //use ready so we only work with the customer link once its been established
        setReady(true);
      };

      if(ready){
        setTraining({...training,customer:customerLink})
        //console.log(training.customer)
        setReady(false)}
   
    //close the dialog
      const handleClose = () => {
        setOpen(false);
      };

      //mapping the input data to the training const
      const handleInputChange = (event) =>{
        setTraining({...training,
          [event.target.name]:event.target.value
        })
      }

      //use the saveTraining function on CustomerList page via props
      //to save the const training as a new training
      const addTraining = ()=>{
        //console.log(training);
        props.saveTraining(training);
        handleClose();
      }
      //handling of the datepicker to set the date picked to the training const
      const ChangeDate=(date)=>{
        setTraining({...training,date:date})
      }
   
    return(
     <div>
      <Button  
        color='primary' 
        onClick={handleClickOpen}>
        <Icon 
          path={mdiNotePlusOutline} 
          size={1} 
          />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New Training
        </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    InputProps={{
                        disabled: true,}}
                    margin="dense"
                    name="cust"
                    value={customer.firstname + " "+ customer.lastname}
                    label="Customer Name"
                    fullWidth
                />
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    label="Date" 
                    name='date'
                    value={training.date}
                    onChange={date => ChangeDate(date)}></DatePicker>
                    </DemoContainer>
                    </LocalizationProvider>
                    
                <TextField
                    type="number"
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={e=>handleInputChange(e)}
                    label="Duration"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={e=>handleInputChange(e)}
                    label="Activity"
                    fullWidth
                />
            </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}>
              Cancel
          </Button>
          <Button 
          onClick={addTraining}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )

}