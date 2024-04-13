const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "bakermuseum.mysql.database.azure.com",
    user: 'mrbaker',
    password: 'Meowmeow!!!',
    database: 'museum',
    ssl: {
        rejectUnauthorized: true
    }
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connection successful');
        connection.release();
    }
});

module.exports = pool;
