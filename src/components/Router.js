//React imports
import {
    HashRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import * as React from "react";
//Components
import './CustomerList';
import Customerapp from './CustomerList';
import './Trainings'
import Trainings from './Trainings';
import HomePage from './HomePage';
import Calendar from './Calendar';
import './Calendar';
import Statistics from './Stats';



export default function Nav(){
    
    return (
    
        <HashRouter >
            <Link to="/CustomerList">Customers</Link>{' '}
            <Link to="/Trainings">Training Sessions</Link>{' '}
            <Link to='/'>HomePage</Link>{' '}
            
            <Link to='/Calendar'>Calendar</Link>{' '}
            <Link to='/Stats'>Statistics</Link>{' '}

            <Routes>
                <Route path="/CustomerList" element={<Customerapp />} />
                <Route path="/Trainings" element={<Trainings />} />
                
                <Route exact path="/" element={<HomePage />}/>
                <Route path="/Calendar" element={<Calendar />}/>
                <Route path="/Stats" element={<Statistics />}/>
            </Routes>
        </HashRouter>)
}