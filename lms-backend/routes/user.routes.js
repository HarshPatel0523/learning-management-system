import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser } from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middlewares.js";

const router = Router();

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword)
router.put('/update-profile', isLoggedIn, upload.single("avatar"), updateUser);

export default router;