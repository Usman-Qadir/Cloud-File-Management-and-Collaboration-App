const app = require('./src/app');
const pool = require('./src/config/Database');

const PORT = 3000;

pool.connect().then(() => {console.log('connected')}).catch((err) => {console.log(err)})





const checkDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()'); // Query the database
    console.log('Database current timestamp:', result.rows[0]); // Output the timestamp
  } catch (err) {
    console.error('Error running query:', err.message); // Log the error message
  } finally {
    pool.end(); // Always close the connection pool
  }
};

checkDatabaseConnection(); // Call the function


const checkDataSaved = async () => {
    try {
        const result = await pool.query('SELECT * FROM users'); // Query the database
        console.log('Fetched Data:', result.rows); // Output the timestamp
    } catch (err) {
        console.error('Error running query:', err.message); // Log the error message
        
    }
}
checkDataSaved();


app.listen(PORT, () => {
    console.log (`Backend server is running on port ${PORT}`)
}) 