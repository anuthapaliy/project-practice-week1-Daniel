// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

import './App.css';
import farmImage from './farm1.webp';
import VolunteerDashboard from './VolunteerDashboard';
import AvailableSessionList from './AvailableSessionList';


function App() {
  const [sessions, setSessions] = useState([]);

useEffect(() => {
  
const fetchSessions= async () => {
  try {
  const response = await fetch('https://project-practice-week1.onrender.com/sessions');
  if (response.ok) {
  const data = await response.json();
  setSessions(data);
  } else {
  console.log('Error fetching sessions:', response.statusText);
  }
  } catch (error) {
  console.log('Error fetching sessions:', error);
  }
  };

  fetchSessions();
  
}, []);



  
// console.log('sessions in App.js:', sessions);
  return (
    <div className="App">
       <h1>City Farm</h1>
     <header className='App-header'>
    
     
      <div className='navbar'>
        <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Contact</a></li>
      </ul>
    </nav> 

    
    </div> 
     
    <img src={farmImage} alt="Farm" className="farm-image" /> 
    </header>

    
    
     
     <main className='content'>
    <div className='management-system'>
      <h2>Volunteer Management System</h2>
     <VolunteerDashboard />
     </div>
        <AvailableSessionList sessions={sessions} setSessions={setSessions} />
     </main>
      
    </div>
  );
}

export default App;
