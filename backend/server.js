require("dotenv").config()
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require('./config/db.js')
const authRoute = require('./routes/authRoutes.js')
const incomeRoute = require('./routes/incomeRoutes.js')
const expenseRoute = require('./routes/expenseRoutes.js')
const dashboardRoute = require('./routes/dashboardRoutes.js')


const app = express()


const allowedOrigins = [
  'https://expense-tracker-nl68-dd1450pou-jaswanths-projects-7b93a134.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())

connectDB();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/income", incomeRoute);
app.use("/api/v1/expense", expenseRoute);
app.use("/api/v1/dashboard", dashboardRoute);




// Server uploads folder
app.use("/uploads",  express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
