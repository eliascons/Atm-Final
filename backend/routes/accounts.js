import express from "express";
import Account from "../models/Account.js";

const router = express.Router();

router.post("/", (req, res) => {
  Account.create(
    { user: req.user.id, balance: req.body.balance },
    (err, acc) => {
      if (err) {
        console.log(err);
        res.sendStatus(401);
      } else {
        res.send("Created Account");
      }
    }
  );
});

router.get("/", (req, res) => {
  Account.find({ user: req.user.id }, (err, acc) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else {
      res.json(acc);
    }
  });
});

router.put("/:id", (req, res) => {
  Account.findByIdAndUpdate(
    req.params.id,
    { balance: req.body.balance },
    (err, acc) => {
      if (err || !req.params.id) {
        console.log("Invalid ID");
        res.sendStatus(400);
      } else {
        res.send("Updated");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  Account.findByIdAndDelete(req.params.id, (err, acc) => {
    if (req.params.id === req.user.id) {
      console.log("Invalid account ID, that is an user Id");
      return res.send("Invalid id");
    }

    if (err || !req.params.id) {
      console.log("Id does not exist");
      return res.sendStatus(400);
    } else {
      
      res.send("Deleted");
    }
  });
});

export default router;
