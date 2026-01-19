//Initializations
require("dotenv").config();

//Server
const express = require("express");
const server = express();
const { port } = process.env;

//Database Initializations
const mongoose = require("mongoose");
const { DB_URI } = process.env;
const User = require("./models/User");

//Security
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;

//Middleware
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

//Server Listen and Database Connection
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(
        `Database is connected \nServer is listening on port ${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
server.get("/", (request, response) => {
  response.send("LIVE!");
});

//User authentication routes
//Register route
server.post("/register", async (request, response) => {
  const { username, password } = request.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    response.status(201).send({ message: "User Created" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//Login route
server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      response.status(404).send({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      response
        .status(403)
        .send({ message: "Username or password are incorrect" });
    }

    const cookie = jwt.sign({ id: user._id, username }, SECRET_KEY);

    response.status(201).send({ message: "User Authenticated", token: cookie });
  } catch (error) {
    response.status(500).send({ message: "Couldn't authenticate user" });
  }
});
