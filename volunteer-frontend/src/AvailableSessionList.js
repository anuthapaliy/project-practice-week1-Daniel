import React, { useState } from 'react';

function AvailableSessionList({ sessions, setSessions }) {
    const [claimedSessions, setClaimedSessions] = useState([]);

    //     // Initialize the state with data from localStorage, if available
//     const storedClaimedSessions = localStorage.getItem('claimedSessions');

// Initialize the state with data from localStorage, if available
// useEffect(() => {
//     const storedClaimedSessions = JSON.parse(localStorage.getItem('claimedSessions')) || [];
//     setClaimedSessions(storedClaimedSessions);
// }, []);

    const claimSession = async (sessionId) => {
        // if the session already booked
        if (claimedSessions.includes(sessionId)) {
            alert('This session is already claimed.');
        }else{
            // Add the sessionId to the claimedSessions state
            setClaimedSessions((prevClaimedSessions) => [...prevClaimedSessions, sessionId]);

            
            // try {
            //     const response = await fetch('https://project-practice-week1.onrender.com/sessions');
            //     if (response.ok) {
            //     const data = await response.json();
            //     setSessions(data);
            //     } else {
            //     console.log('Error fetching sessions:', response.statusText);
            //     }
            //     } catch (error) {
            //     console.log('Error fetching sessions:', error);
            //     }
    }
};

    if (!sessions || sessions.length === 0) {
        return <div>Loading sessions...</div>
    }

    // Filter the available sessions to exclude claimed session
    // const AvailableSessions = sessions.filter((session) => !claimedSessions.includes(session.id));

    return (
        <div>
            <h2>Available Sessions</h2>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                        {session.date} - {session.time}
        <button
    onClick={() => claimSession(session.id)}
    className={`claim-button ${claimedSessions.includes(session.id) ? 'claimed' : ''}`}
    disabled={claimedSessions.includes(session.id)}
>
    {claimedSessions.includes(session.id) ? 'claimed' : 'claim'}
    
</button>

                    </li>  
                ))}
            </ul>
        </div>
    );
}

export default AvailableSessionList;


