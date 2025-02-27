// Getting the required modules

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { initializeDb } = require('./config/database');

// Defining the routes

const indexRouter = require('./routes/index')
const apiPreFix = '/api/v1';

// Middleware

app.use(express.json());

// Using the routes

app.use('/' + apiPreFix, indexRouter);

// Initialize the database

initializeDb().then(() => {
    console.log('Database initialized');    
}).catch(error => {
    console.error('Failed to initialize database:', error);
})

// Starting the server

app.listen(port, () => {
    console.log(`Server running on port ${port}`);  
});