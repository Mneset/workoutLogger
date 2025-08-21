// Getting the required modules

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { initializeDb } = require('./config/database');
const { auth } = require('express-oauth2-jwt-bearer')
const { errorHandler } = require('./utils/errorHandler');

const jwtCheck = auth ({
    audience: process.env.AUTH_AUDIENCE,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

// Defining the routes

const indexRouter = require('./routes/index')
const sessionRouter = require('./routes/sessionLog');
const setsRouter = require('./routes/sets');
const exercisesRouter = require('./routes/exerciseLog');
const apiPreFix = '/api/v1';

// Middleware

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Using the routes
app.use(jwtCheck);
app.use(apiPreFix, indexRouter);
app.use(`${apiPreFix}/session`, sessionRouter);
app.use(`${apiPreFix}/sets`, setsRouter);
app.use(`${apiPreFix}/exercise-log`, exercisesRouter);

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

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);