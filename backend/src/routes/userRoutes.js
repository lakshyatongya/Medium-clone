import express from 'express';
import { signup, signin ,verifyOtp, getName} from '../controllers/authentication.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post("/verifyOtp",verifyOtp)
router.get('/getUserName',getName)
export default router;