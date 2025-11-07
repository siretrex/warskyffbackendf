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





app.post("/register-team", registerTeam);
app.get("/teams", getAllTeams);





const { deleteUser} = require('./controllers/Users-controller.js')
app.delete("/deleteuser/:id", deleteUser);

const Team = require('./models/Team-model.js')
app.put("/updateteam/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err)
  }
});







const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
