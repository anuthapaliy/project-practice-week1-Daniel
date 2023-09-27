
const express = require("express");
const app = express();
const cors = require ("cors");
const { Pool } = require("pg");
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
// database configuration
// const db = new Pool({
//     user: process.env.DB_USERNAME,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     ssl: true
//     })
    
const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
  });
    
    db.connect(function (err){
    // if (err) throw err;
    console.log("Connected to the database");
    });

    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
    
app.use(cors());





// Get all sessions

app.get("/sessions", async (request, response) => {
    try {
    const query = 'SELECT * From sessions';
    
    
    const { rows } = await db.query(query);
    response.json(rows);
    } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'An error occured while fetching sessions' });
    }
    });
    
    // app.get("/sessions", (req, res) => {
    //     db.query("select * from sessions")
    //       .then((result) => res.json(result.rows))
    //       .catch((err) => res.send(err));
    //   });

//   Route to claim a session
app.post("/sessions/claim/:id", async (request, response) => {
    try {
        const sessionId = request.params.id;

        // check if the session with the given ID exists and is available
        const checkQuery = 'select * from public.sessions where id = $1 and booked = false';
        const { rows } = await db.query(checkQuery, [sessionId]);

        if (rows.length === 0) {
            return response.status(404).json({ error: "session not available for claiming" });
        }

        // Update the session to mark it as booked by the volunteer

        const updateQuery = 'UPDATE sessions SET booked = true where id = $1';
        await db.query(updateQuery, [sessionId]);

        response.json({ message: "Session claimed successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "An error occured while claiming the session" });
      }
    });
// To get available sessions that are not booked
    app.get("/sessions", async (req, res) => {
        try {
         
          const query = 'SELECT * FROM sessions WHERE booked = false';
      
          const { rows } = await db.query(query);
          res.json(rows);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching sessions' });
        }
      });
      
    
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
      });
      
    
    
    
    