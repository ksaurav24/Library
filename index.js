const express = require("express");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const zod = require("zod");
const securityKey = process.env.SECURITY_KEY;
const mongooseUrl = process.env.MONGOOSE_URL;
const bcrypt = require("bcrypt");
const port = process.env.PORT || 3000;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const passwordSchema = zod.string().min(8).max(100);
const usernameSchema = zod.string().min(3).max(100).email();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(mongooseUrl);

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
  rentedBooks: Array,
});
const Books = mongoose.model("Books", {
  Title: String,
  Author: String,
  No_pages: Number,
});

async function checkInput(req, res, next) {
  const { username, password } = req.body;
  const usernameValidation = usernameSchema.safeParse(username);
  const passwordValidation = passwordSchema.safeParse(password);
  if (
    usernameValidation.success === false ||
    passwordValidation.success === false
  ) {
    res.redirect("/login");
  }
  next();
}

async function checkUser(req, res, next) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return res.redirect("/login");
    }
    const data = jwt.verify(token, securityKey);
    req.user = data;
    next();
  } catch (error) {
    console.log(error.message);
    res.redirect("/login");
  }
}

app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", checkInput, async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username: username.toLowerCase() });
  if (userExist) {
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (isPasswordMatch) {
      const token = await jwt.sign({ username: username }, securityKey);
      localStorage.setItem("token", token);
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/register");
  }
});
app.post("/signOut", (req, res) => {
  localStorage.removeItem("token");
  res.redirect("/login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", checkInput, async (req, res) => {
  const { name, username, password } = req.body;
  const userExist = await User.findOne({ username: username.toLowerCase() });
  if (userExist) {
    console.warn("User already exists");
    res.redirect("/login");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    user.save();
    res.redirect("/login");
  }
});

app.get("/", checkUser, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  const books = await Books.find();
  res.render("home", { user, books: books });
});
app.use((err, req, res, next) => {
  res.render("error", { message: err.message, statuscode: err.statuscode });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
