import express from 'express';

const router = express.Router();

async function getAdminDetails(req, res) {
    console.log("getAdminDetails");
    res.send("getAdminDetails");
}

router.get('/admin/details', getAdminDetails);

export default router;