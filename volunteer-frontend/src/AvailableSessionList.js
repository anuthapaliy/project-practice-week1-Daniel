import React, { useState } from 'react';

function AvailableSessionList({ sessions }) {
    const [claimedSessions, setClaimedSessions] = useState([]);

    const claimSession = (sessionId) => {
        // if the session already booked
        if (claimedSessions.includes(sessionId)) {
            alert('This session is already claimed.');
        }else{
    
    // Add the sessionId to the claimedSessions state
    setClaimedSessions((prevClaimedSessions) => [...prevClaimedSessions, sessionId]);

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
                        <button onClick={() => claimSession(session.id)} className="claim-button" disabled={claimedSessions.includes(session.id)}>
                        {claimedSessions.includes(session.id) ? 'claimed' : 'claim'}
                        </button>
                    </li>  
                ))}
            </ul>
        </div>
    );
}

export default AvailableSessionList;
