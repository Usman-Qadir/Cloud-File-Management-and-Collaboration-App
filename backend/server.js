import app from './src/app.js'
import pool from './src/config/Database.js'


const PORT = 3000;


const checkDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()')
    console.log('Database current timestamp:', result.rows[0])
  } catch (err) {
    console.error('Error running query:', err.message)
    process.exit(1) // Exit the process with a failure code
  }
}

checkDatabaseConnection() // Call the function



app.listen(PORT, () => {
    console.log (`Backend server is running on port ${PORT}`)
}) 