CREATE TABLE volunteer (
  
  id SERIAL PRIMARY KEY,
  name  VARCHAR(255) NOT NULL,
  email  VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
cancelled BOOLEAN NOT NULL
 
);
