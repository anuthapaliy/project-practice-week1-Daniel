// const mysql = require('mysql');
const { Pool } = require("pg");
const dotenv = require('dotenv');
dotenv.config();

const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  db.connect(function (err){
    // if (err) throw err;
    console.log("Connected to the database");
    });

// a. add 100 volunteers

    // function to generate and insert volunteer data

   
     async function generateVolunteers() {
                // No. of volunteers to generate
        const volunteersNo = 100;

        // Loop to generate and insert volunteers
for (let i = 1; i<= volunteersNo; i++){
    // Generate a volunteer data
            const name = `Volunteer ${i}`;
            const email = `volunteer${i}@exam.com`;
            const phone_number = `123456789${i.toString().padStart(2, '0')}`;
            const cancelled = Math.random()<0.2;

            // SQL query to insert a volunteer
            const query = {
                text: 'INSERT INTO volunteer (name, email, phone_number, cancelled) values ($1, $2, $3, $4)',
                values: [name, email, phone_number, cancelled]
            };

            try {

                // Insert the volunteer data into the database
                await db.query(query);
                console.log(`Inserted volunteer: ${name}`);
            } catch (error) {
                console.error(`Error inserting volunteer: ${name}`, error);
            }
            }
        }
    
// Execute the generateVolunteers function and handle success or failure

    generateVolunteers()
        .then(() => {
            console.log('Data generation completed for volunteers.');
            
        })
        .catch(error => {
            console.error('Volunteer generation failed:', error);
            
        })

//         // b.Add two sessions a day
        async function addSessions() {
            const startDate = new Date('2023-10-01');
            const endDate = new Date('2023-10-31');

            const sessionTimes = ['afternoon', 'night'];

            let currentDate = startDate;
            while (currentDate <= endDate) {
                for (const sessionTime of sessionTimes) {
                    let sessionDate = currentDate.toISOString().split('T')[0];

                    let sessionTimeValue;
                 let sessionType;

                 if (sessionTime === 'afternoon') {
                 sessionTimeValue = '12:00:00';
                   sessionType = 'afternoon';
                   } else {
                 sessionTimeValue = '10:00:00';
                   sessionType = 'night';
}

                    
                    let isBooked = Math.random() < 0.2;
      
 //sql query to insert a session
        const insertQuery = {
            text: 'INSERT INTO sessions (date, time, session_type, booked) VALUES ($1, $2, $3, $4)',
            values: [sessionDate, sessionTimeValue, sessionType, isBooked]
        };

        try {
            await db.query(insertQuery);
            console.log(`Inserted session for ${sessionDate} (${sessionTime})`);
        } catch (error) {
            console.error(`Error inserting session for ${sessionDate} (${sessionTime}):`, error);
        }
    }

// Move to the next day

    currentDate.setDate(currentDate.getDate() + 1);
}

}       
            
            // call the add session function
            addSessions()
                .then(() => {
                    console.log('Session generation completed.');
                
                })
                .catch((error) => {
                    console.error('Session generation failed:', error);
                
                });

            // c.Randomly allocate sessions to volunteers

            async function getRandomVolunteerId(){
                const query = "select volunteer_id from volunteer order by random() limit 1";
                const result = await db.query(query);
                return result.rows[0].volunteer_id;
            }

            async function getRandomSessionId() {
                const query = "select session_id from sessions order by random() limit 1";
                const result = await db.query(query);
                return result.rows[0].session_id;
            }

            async function allocateSessionsToVolunteers() {
                const totalAllocations = 1000;
                for(let i = 0; i < totalAllocations; i++) {
                    const volunteerId = await getRandomVolunteerId();
                    const sessionId = await getRandomSessionId();

                    const query = {
                        text: "insert into booking (volunteer_id, session_id) values ($1, $2)",
                        values: [volunteerId, sessionId],
                    };
                    
                    console.log("SQL Query:", query.text);

                    try {
                        await db.query(query);
                        console.log(`Allocated session ${sessionId} to volunteer ${volunteerId}`);
                    } catch (error) {
                        console.error(`Error allocating session to volunteer:`, error);
                    }
                  }
                  }

                //   call the function to allocate sessions to volunteers

                allocateSessionsToVolunteers()
                .then(() => {
                    console.log("session allocation completed.");
                })
                .catch((error) => {
                    console.error("Session allocation failed:", error);
                })
  
  
  
  
  
  