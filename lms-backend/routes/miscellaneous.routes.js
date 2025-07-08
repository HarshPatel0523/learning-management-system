import { Router } from "express";
import { contactUs, userStats } from "../controllers/miscellaneous.controllers.js";
import { authorizeRoles, isLoggedIn } from "../middlewares/auth.middlewares.js";

const router = Router()

router.post('/contact', contactUs)

router.get('/admin/stats/users', isLoggedIn, authorizeRoles('ADMIN'), userStats)

export default router;