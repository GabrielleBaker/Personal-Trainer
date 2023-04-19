//React imports 
import React from 'react';
//Mui imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//Mdi imports
import Icon from '@mdi/react';
import { mdiAccountEdit } from '@mdi/js';


export default function EditCustomer(props){

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer]= React.useState({
        firstname:'', 
        lastname:'', 
        streetaddress:'', 
        postcode:'', 
        city:'', 
        email:'', 
        phone:''
    })

    //on form open, get customer info from props
    const handleClickOpen = () => {
     // console.log(props.params)
      setCustomer({
        firstname:props.params.firstname, 
        lastname:props.params.lastname,
        streetaddress:props.params.streetaddress,
        postcode:props.params.postcode,
        city:props.params.city,
        email:props.params.email,
        phone:props.params.phone
      })
        setOpen(true);
      };
    
      //handle close dialog
      const handleClose = () => {
        setOpen(false);
      };
      //map changes from the input fields to the customer const
      const handleInputChange = (event) =>{
        setCustomer({...customer,
          [event.target.name]:event.target.value
        })
      }

      //saves the new customer using the updatecustomer method via props
      //the href contains the unique id of each customer
      const updateCustomer = ()=>{
        props.updateCustomer(customer,props.params.links[0].href);
        handleClose();
      }

      
    return(
    <div>
      <Button  
        onClick={handleClickOpen}>
        <Icon 
          path={mdiAccountEdit} 
          size={1.3} 
          />
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose}>
        <DialogTitle>
            Edit Customer
          </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={e=>handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={e=>handleInputChange(e)}
                    label="Lastname"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={e=>handleInputChange(e)}
                    label="Street Address"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={e=>handleInputChange(e)}
                    label="Post Code"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={e=>handleInputChange(e)}
                    label="City"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={e=>handleInputChange(e)}
                    label="Email"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={e=>handleInputChange(e)}
                    label="Phone"
                    fullWidth
                />
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
        </div>
    )

}