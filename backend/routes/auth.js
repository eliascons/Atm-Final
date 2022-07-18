import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/User.js";
import "dotenv/config";

const router = express.Router();

let refreshTokens = [];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {

    if (err || !user) {
      return res.sendStatus(401);
    } else {
      user.comparePassword(password, function (err, isMatch) {

        if (err) throw err;

        if (isMatch) {
          console.log('valid')
          const accessToken = jwt.sign(
            { username: user.username, id: user._id },
            process.env.SECRET_TOKEN,
            { expiresIn: "120m" }
          );

          const refreshToken = jwt.sign(
            { username: user.username, id: user._id },
            process.env.REFRESH_TK
          );


          refreshTokens.push(refreshToken);
          res.json({ accessToken, refreshToken, username });
        } else {
          console.log('err');
          return res.sendStatus(401);
        }

      });




    }
  });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.sendStatus(500);
    } else {
      User.create({ username: username, password: password }, (err, user) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        } else {
          console.log(user);
          res.send("Success");
        }
      });
    }
  });
});
// logout
router.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.send("logout success");
});

export default router;
