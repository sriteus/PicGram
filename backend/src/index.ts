import express from "express";
import { Router } from "express";
import userAuth from "./routes/userAuth";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";

declare module "express-session" {
  interface SessionData {
    username: string;
    email: string;
    userId: number;
  }
}

const app = express();
const router = Router();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use("/userauth", userAuth);

app.listen(2200, () => {
  console.log("Listening at 2200");
});
