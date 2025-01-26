import express  from "express"
import cors from "cors"
import pool from "../src/config/Database.js"
import router from "./routes/fileRoutes.js"

const app = express()
app.use (express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())

app.use("/api/files", router)

//* Root route
app.get("/", (req, res) => {
  res.send("Backend server is running")
});

app.get("/api/files/uploads", (req, res) => {
  res.send("API is running")
})


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

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});




export default app;
