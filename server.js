const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "server/client")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );
  next();
});

const mongoose = require("mongoose");
const keys = require("./server/keys/keys");
mongoose
  .connect(keys.db_url)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error in conntecting to DB");
    console.log(error);
  });

// Cloudinary setup
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "string",
  api_key: "string",
  api_secret: "string",
});

// All routes goes here
const apitestRoutes = require("./server/routes/apitest");
app.use("/api/test", apitestRoutes);

const authRoutes = require("./server/routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("./server/routes/user");
app.use("/api/user", userRoutes);

const emailVerifyRoutes = require("./server/routes/emailVerify");
app.use("/verify", emailVerifyRoutes);

const adminRoutes = require("./server/routes/admin");
app.use("/api/admin", adminRoutes);

const messageRoutes = require("./server/routes/message");
app.use("/api/message", messageRoutes);

const newsletterRoutes = require("./server/routes/newsletter");
app.use("/api/newsletter", newsletterRoutes);

const homeRoutes = require("./server/routes/home");
app.use("/api/home", homeRoutes);

const portfolioRoutes = require("./server/routes/portfolio");
app.use("/api/portfolio", portfolioRoutes);

const skillRoutes = require("./server/routes/skill");
app.use("/api/skill", skillRoutes);

const testimonialRoutes = require("./server/routes/testimonial");
app.use("/api/testimonial", testimonialRoutes);

const contactRoutes = require("./server/routes/contact");
app.use("/api/contact", contactRoutes);

// serving static files
// app.use('*', (req, res, next) => {
//   res.sendFile('index.html');
// });

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message,
  });
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`App listenong on port ${port}`);
});
