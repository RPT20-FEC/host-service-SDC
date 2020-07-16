
-- CREATE DATABASE hostSDC;

CREATE TABLE hosts (
  id SERIAL,
  name VARCHAR(40),
  description TEXT,
  duringStay TEXT,
  reviews INT,
  verified Boolean,
  superhost Boolean,
  joined_at Date,
  languages VARCHAR(60),
  responseTime VARCHAR(30),
  responseRate INT,
  location VARCHAR(40),
  avatarUrl VARCHAR(255),
  CONSTRAINT hosts_pkey PRIMARY KEY (id)
);


CREATE TABLE cohosts (
  id SERIAL PRIMARY KEY,
  hostId INT,
  cohostId INT
);



