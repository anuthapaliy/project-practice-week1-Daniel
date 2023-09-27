import React from 'react';
import AvailableSessionList from './AvailableSessionList'; 


function VolunteerDashboard({ sessions }) {
    // const [claimedSessions, setClaimedSessions]=useState([]);

    // const claimSession = (sessionId) => {
    //     if (claimedSessions.includes(sessionId)) {
    // console.log(`Session with ID ${sessionId} is already claimed.`);

    // return;
        // }

        // Add the session ID to the claimedSessions state

    //     setClaimedSessions([...claimedSessions, sessionId]);

    //     console.log(`Claimed session with ID ${sessionId}`);
    // };
    return (
        <div>
        <h1>Volunteer Dashboard</h1>
        <AvailableSessionList sessions={sessions} />

        </div>
    );
}


export default VolunteerDashboard;