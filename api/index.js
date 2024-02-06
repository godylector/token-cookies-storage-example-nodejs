const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

let secret_key = "HelloWorld";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET, POST, PATCH, PUT, DELETE",
};

app.use(cors(corsOptions));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies["my_token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
  } catch (err) {
    res.clearCookie("my_token");
    return res.status(401).send("Invalid Token");
  }
  return next();
};

app.get("/user/profile", verifyToken, (req, res) => {
  res.send(`Welcome ${req.user.userId}!`);
});

app.post("/login", (req, res) => {
  const token = jwt.sign({ userId: 1 }, secret_key, { expiresIn: "10s" });
  res.cookie("my_token", token, { httpOnly: true, secure: false });
  res.send("Login Successful");
});

app.listen(4000, console.log("API RUNNING ON 4000"));
