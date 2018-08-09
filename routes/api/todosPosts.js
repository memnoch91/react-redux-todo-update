const express = require("express");

const router = express.Router();

/**
 * @route       GET/api/todos/test
 * @description test get todos
 * @acces       Public
 */
router.get("/test", (req, res) => {
  res.json({ msg: "todos work" });
});

module.exports = router;
