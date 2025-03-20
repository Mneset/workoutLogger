// Getting the required modules

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { initializeDb } = require('./config/database');
const { auth } = require('express-oauth2-jwt-bearer')

const jwtCheck = auth ({
    audience: process.env.AUTH_AUDIENCE,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});


// Defining the routes

const indexRouter = require('./routes/index')
const newSessionRouter = require('./routes/newSession');
const sessionHistoryRouter = require('./routes/sessionHistory');
const apiPreFix = '/api/v1';

// Middleware

app.use(cors({origin: 'http://localhost:3001'}));
app.use(express.json());

// Using the routes

app.use(apiPreFix, jwtCheck, indexRouter);
app.use(apiPreFix, newSessionRouter);
app.use(apiPreFix, sessionHistoryRouter);

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

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    } else {
        next(err);
    }
});