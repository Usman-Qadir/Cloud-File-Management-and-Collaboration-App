const app = require('./src/app');
const pool = require('./src/config/Database');

const PORT = 3000;


const checkDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()'); // Query the database
    console.log('Database current timestamp:', result.rows[0]); // Output the timestamp
  } catch (err) {
    console.error('Error running query:', err.message); // Log the error message
  } 
};

checkDatabaseConnection(); // Call the function



app.listen(PORT, () => {
    console.log (`Backend server is running on port ${PORT}`)
}) 