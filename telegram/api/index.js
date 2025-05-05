import express from 'express';
// import user from './user.js';
import notif from './notif.js'

const router = express.Router();

// router.use('/user', user);
router.use('/notif', notif);

export default router;