CREATE DATABASE Files-Upload-Management-System;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL, --hashed password


);

CREATE TABLE files(
    id SERIAL PRIMARY KEY,
    userid INT REFERENCES users(id),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT,
    file_size BIGINT,
    file_type VARCHAR(50),
    Uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);