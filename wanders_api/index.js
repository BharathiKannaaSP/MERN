import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
// import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import passportSetup from "./passport.js";
import passport from "passport";
import session from 'express-session';


const app = express();

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};
mongoose.set("strictQuery", false);
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected...");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected...");
});

//middlewares

app.use(cookieParser());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["bk"],
//     maxAge: 24 * 60 * 60 * 100,
//   }),
// );
app.use(session({
  secret: 'abcddsfsdfareczvvsafd',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);


app.use(express.json());
app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something Went Wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});
app.listen(8000, () => {
  connect();
  console.log("Connected to Backend");
});
