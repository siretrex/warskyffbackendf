require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const connectDB = require("./db/connectDB")
const registerUser = require('./controllers/sign-up')
const loginUser = require('./controllers/sign-in.js')
const {getAllUsers } = require('./controllers/Users-controller.js')
const { verifyToken } = require("./utils/jwt.js");


const { addTournament, getTournaments } = require('./controllers/turnamentController.js')
const { registerTeam, getAllTeams } = require('./controllers/RegisterTeam-controller.js')


const app = express();
app.use(cors());
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Root route accessed at:", new Date().toLocaleString());
  res.send("MongoDB connection successful ✅");
});


app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/allusers", getAllUsers);
app.post("/addTournament", addTournament);
app.get("/tournament", getTournaments);

app.delete("/deleteuser/:id", deleteUser);



app.post("/register-team", registerTeam);
app.get("/teams", getAllTeams);







const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
