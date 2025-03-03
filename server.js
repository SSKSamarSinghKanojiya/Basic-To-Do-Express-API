require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const bodyParser = require("body-parser")
const todoRoute = require("./routes/todoRoutes.js")


const app = express()

connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// Allow all origins (Not recommended for production)
// app.use(cors());

// Allow specific origins
app.use(
  cors({
    origin: "https://example.com", // Allow only this domain
    // methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    methods: ["POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow sending cookies
  })
);

app.get("/data", (req, res) => {
  try {
    res.json({ message: "CORS is enabled!" });
  } catch (error) {
   res.json({error:error.message}) 
  }
});

app.use('/api/todos',todoRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`Server running on PORT ${PORT}`);
  
})