const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const name = req.userName;
  userDb.insert(name).then(user => res.status(200).json(user));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const userId = req.user;
  const newPost = req.newPost;
  console.log(userId, newPost);
});

router.get("/", (req, res) => {
  userDb.get().then(users => res.status(200).json(users));
});

router.get("/:id", validateUserId, (req, res) => {
  const userId = req.user;
  userDb.getById(userId).then(user => res.status(200).json(user));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const userId = req.user;
  userDb.getUserPosts(userId).then(posts => res.status(200).json(posts));
});

router.delete("/:id", validateUserId, (req, res) => {
  const userId = req.user;
  userDb
    .remove(userId)
    .then(number =>
      res.status(200).json({ message: `you have deleted ${number} user` })
    );
});

router.put("/:id", validateUser, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id;
  if (userId > 20) {
    res.status(400).json({ message: "invalid user id" });
  } else {
    req.user = userId;
    next();
  }
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else {
    const name = req.body;
    if (!name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      req.userName = name;
      next();
    }
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  }
  const newPost = req.body;
  if (!newPost.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    req.newPost = newPost;
    next();
  }
}

module.exports = router;
