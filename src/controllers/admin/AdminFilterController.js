import express from 'express';

const router = express.Router();
async function adminFilterController(req, res, next) {
    console.log("adminFilter");
    next();
}

router.use('/admin', adminFilterController);

export default router;