import express from "express";
import cors from 'cors';
import UserRouter from "./routes/user";
import TradesRouter from "./routes/trades";
import session from "express-session";
import 'reflect-metadata';
import { initDb } from "./db";

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));
// having issues with cors requests and logout, this fixes it but
// is not safe. only used for dev purposes
app.use(express.json());

// Use express-session middleware
app.use(
    session({
        secret: "orderbook",
        resave: false,
        saveUninitialized: false,
        cookie: { expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
    })
);

const runApp = async () => {
    await initDb().then(() => {
        // routes need to be imported after db connection has been established with type ORM
        app.use("/", UserRouter, TradesRouter);
    });
    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
}

runApp();