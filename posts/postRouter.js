const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDb.get().then(posts => res.status(200).json(posts));
});

router.get("/:id", validatePostId, (req, res) => {
  const postId = req.postId;
  postDb.getById(postId).then(post => res.status(200).json(post));
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  postDb
    .remove(postId)
    .then(number =>
      res
        .status(200)
        .json({ messsage: `you have successfully delete ${number} post` })
    );
});

router.put("/:id", validatePostId, (req, res) => {
  const postId = req.postId;
  const changedPost = req.body;
  postDb
    .update(postId, changedPost)
    .then(count =>
      res
        .status(200)
        .json({ messsage: `you have successfully updated ${count} post` })
    );
});

// custom middleware

function validatePostId(req, res, next) {
  const postId = req.params.id;
  if (postId > 37) {
    res.status(400).json({ message: "missing post id" });
  } else {
    req.postId = postId;
    next();
  }
}

module.exports = router;
