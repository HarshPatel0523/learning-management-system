import { Router } from 'express';
import { buySubscription, cancelSubscription, getAllSubscriptions, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controllers.js';
import { authorizeRoles, isLoggedIn } from '../middlewares/auth.middlewares.js';

const router = Router();

router.get('/razorpay-key', isLoggedIn, getRazorpayApiKey)

router.post('/subscribe', isLoggedIn, buySubscription)

router.post('/verify', isLoggedIn, verifySubscription)

router.post('/unsubscribe', isLoggedIn, cancelSubscription)

router.get('/', isLoggedIn, authorizeRoles('ADMIN'), getAllSubscriptions)

export default router;