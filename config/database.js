const db = require('../models');

async function initializeDb() {
    try {
        await db.sequelize.sync({ alter: true });
        console.log('Database initialized');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

module.exports = { initializeDb };