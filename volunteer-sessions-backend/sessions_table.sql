-- create_sessions_table.sql


CREATE TABLE sessions (
  
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  session_type VARCHAR(255) NOT NULL,
  booked BOOLEAN NOT NULL
);
