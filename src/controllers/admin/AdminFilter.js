import express from 'express';

const router = express.Router();
async function adminFilter(req, res, next) {
    console.log("adminFilter");
    next();
}

router.use('/admin', adminFilter);

export default router;