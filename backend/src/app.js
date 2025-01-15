import express  from "express"
import cors from "cors"
import pool from "../src/config/Database.js"

const app = express()
app.use (express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())

//* Root route
app.get("/", (req, res) => {
  res.send("Backend server is running")
});

// Database test route
app.get("/check-database", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()")
    res.status(200).json({ success: true, timestamp: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
});

// Fetch data from users table
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users")
    res.status(200).json({ success: true, data: result.rows })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

app.post("/upload", async (req, res) => {
  try {
    // Assuming you use Multer to handle file uploads
    const files = req.files; // Handle files processed by Multer
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded." });
    }

    // Example: Sending back file details
    res.status(200).json({ success: true, data: files });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default app;
