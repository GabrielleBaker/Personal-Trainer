//React imports
import * as React from 'react';
//Mui imports
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
//Components
import Date from './Date';
import Quotes from './Quotes';
import './Quotes';
import Weather from './Weather';

export default function HomePage(){
    //image list adapted from: 
    //https://mui.com/material-ui/react-image-list/
    
    //data for imagelist-menu
    const itemData = [
        {
          img: '/training3.jpg',
          title: 'Trainings',
          href:"/Trainings",
        },
        {
          img: '/customers.jpg',
          title: 'Customers',
          href:"/CustomerList"
        },
        {
            img: 'calendar.jpg',
            title: 'Calendar',
            href:"/Calendar"
          },
        {
          img: 'stats2.jpg',
          title: 'Statistics',
          href:"/Stats"
        },
        
      ];
      
    return(
        <div>
            <Container  
                margins="auto" 
                maxWidth="90%" 
           >
                <h2>Welcome Trainer!</h2> 
                <Box sx={{
                    width:750,
                    margin:'auto',
                    height: 350,
                    backgroundColor: '#ffcce6',
                    borderRadius: '25px',
                    padding:2, 
                }}>
                <h4>Quote of the day:</h4>
                    <Quotes/>
                    <Date></Date>
                    <Weather></Weather>
                </Box>
       
            <Container 
                margins="auto" 
                maxWidth="90%" 
                align="center" 
                sx={{
                    width:800,
                    height: 600, 
                    backgroundColor:'#ffcce6', 
                    borderRadius: '25px' 
                    }}>
                    
            <ImageList 
                sx={{ 
                    width: 650, 
                    height: 600,
                    padding:5.5
                }} 
                cols={2} 
                rowHeight={200}>
                {itemData.map((item) => (
                <ImageListItem 
                    key={item.img} 
                    component="a" 
                    href={item.href}
                    sx={{'&:hover': {
                        backgroundColor: '#ff80c1',
                        opacity: [0.9, 0.8, 0.7],
                        }}}>
                    <text>
                        {item.title}
                    </text>
                   <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    /> 
                </ImageListItem>
        ))}
            </ImageList>
        </Container>
        </Container>
        </div>
       
    )
}
