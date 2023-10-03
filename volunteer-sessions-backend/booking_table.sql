CREATE TABLE booking (
  id SERIAL PRIMARY KEY,
  volunteer_id INTEGER REFERENCES volunteer(id) NOT NULL,
  session_id INTEGER REFERENCES sessions(id) NOT NULL,
  UNIQUE (volunteer_id, session_id)
);
