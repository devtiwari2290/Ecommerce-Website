import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// router Object
const router = express.Router();

// routing
// Register  || Post
router.post("/register", registerController);

// Login route || Post
router.post("/login", loginController);

// Forgot password ||Post
router.post("/forgot-password", forgotPasswordController);

// test route || Get
router.get("/test", requireSignIn, isAdmin, testController);

// protected route || Get
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route || Get
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
