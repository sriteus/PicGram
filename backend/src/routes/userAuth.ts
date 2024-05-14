import express from "express";
import db from "../database/db";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { Request, Response } from "express";

// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       token?: string;
//     }
//   }
// }

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const pass = req.body.password;
    const hashPass = await bcrypt.hash(pass, 10);
    const query =
      "INSERT INTO users ( name, email, mobile, age, password)VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    await db(query, [
      req.body.name,
      req.body.email,
      req.body.mobile,
      req.body.age,
      hashPass,
    ]);
    res.json({
      success: true,
      message: "Signup SUCCESS",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});

router.post("/login", async (req, res) => {
  try {
    const simplePass: string = req.body.password;
    const query: string = "SELECT * FROM users WHERE (email)=($1)";
    const result = await db(query, [req.body.email]);
    if (result[0] !== undefined) {
      const validPass = await bcrypt.compare(simplePass, result[0].password);

      if (validPass) {
        req.session.username = result[0].name;
        req.session.email = result[0].email;
        res.json({
          success: true,
          message: "Login SUCCESS",
          user: result[0],
          Login: true,
        });
      } else {
        res.json({
          success: false,
          message: "Password is Incorrect",
          Login: false,
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid Email ID",
        Login: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
  }
});
router.get("/", (req, res) => {
  console.log(req.session);
  if (req.session.username) {
    console.log("Session is on");
    return res.json({
      validUser: true,
      username: req.session.username,
      email: req.session.email,
    });
  } else {
    console.log("Session is OFFFF");
    return res.json({ validUser: false });
  }
});
// const ensureToken = (req: Request, res: Response, next: NextFunction) => {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     if (bearerToken) {
//       req.token = bearerToken;
//       next();
//     } else {
//       res.sendStatus(403);
//     }
//   } else {
//     res.sendStatus(403);
//   }
// };

// router.get("/protected", ensureToken, async (req, res) => {
//   const token = req.token ?? "";

//   jwt.verify(token, "my_secrect_key", function (err, data) {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         text: "this is protected ",
//         data: data,
//       });
//     }
//   });
// });

// router.post("/protectedlogin", async (req, res) => {
//   const user = { id: 3 };
//   const token = jwt.sign({ user }, "my_secrect_key");
//   res.json({
//     token: token,
//   });
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "frontend",
      "public",
      "assets"
    );
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.post("/addimage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const { name, description } = req.body;
    const imagePath = req.file.path;
    const start_index = imagePath.indexOf("assets");
    const resultImagePath =
      start_index !== -1 ? `/${imagePath.slice(start_index)}` : "";

    const query =
      "INSERT INTO posts (name, description, image) VALUES ($1, $2, $3) RETURNING *;";
    const result = await db(query, [name, description, resultImagePath]);

    res.json({
      success: true,
      message: "Category added successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request");
    console.log("WHATTTTTT");
  }
});

router.get(
  "/getposts",
  async (
    req: Request<any, any, any, { page?: string; limit?: string }>,
    res: Response
  ) => {
    try {
      const page = parseInt(req.query.page || "1", 10) || 1;
      const limit = parseInt(req.query.limit || "10", 10) || 10;
      const offset = (page - 1) * limit;
      const query = `SELECT name, description, image FROM posts ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
      const result = await db(query);

      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing your request");
    }
  }
);

router.get(
  "/getuserposts",
  async (
    req: Request<any, any, any, { page?: string; limit?: string }>,
    res: Response
  ) => {
    try {
      const page = parseInt(req.query.page || "1", 10) || 1;
      const limit = parseInt(req.query.limit || "10", 10) || 10;
      const offset = (page - 1) * limit;
      const username = (req.query as { username: string }).username;
      const query = `SELECT name, description, image FROM posts WHERE name = '${username}' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
      const result = await db(query);

      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing your request");
    }
  }
);

export default router;
