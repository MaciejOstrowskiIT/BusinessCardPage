import express, { Express, Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";

const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

import deletePost from "./posts/deletePost";

dotenv.config();

const app: Express = express();
const PORT: number = 31717;

app.use(cors())
app.use(bodyParser.json());

app.get("/getTest", (req: Request, res: Response) => {
    res.send("get-test");
});

app.post("/postTest", (req: Request, res: Response) => {
    res.send("post-test");
});


const register = require("./posts/registerUser");
app.post("/register", register);

const login = require("./gets/loginUser");
app.get("/login", login);

const addNewPost = require("./posts/addNewPost");
app.post("/addNewPost", addNewPost);

app.delete("/deletePost/:title", deletePost);


app.listen(PORT, () => {
    const fullTime = new Date().toLocaleTimeString('pl-PL', { hour12: false });
    console.log(fullTime + ` Server is running on port ${PORT}`);
})
