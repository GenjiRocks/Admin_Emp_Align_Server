const express = require("express");
const authenticateToken = require("../middleware/auth");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  searchUser,
} = require("../controller/userController");
const router = express.Router();
const upload = require("../middleware/multer");

// getting all the user
router.get("/", authenticateToken, getAllUsers);

// query search by name
router.get("/search", authenticateToken, searchUser);

//getting user by id
router.get("/:id", authenticateToken, getUser);

//updating the user with id
router.put("/:id", authenticateToken, upload.single("image"), updateUser);

// deleting the user with id
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;

/* Yes, the order of routes matters in Express.js because Express evaluates routes in the order they are defined. If a route matches, Express stops searching for other matches. This is known as route precedence. */
