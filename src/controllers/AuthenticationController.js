import express from 'express';
import base64url from 'base64url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UsersService from "../services/UsersService.js";

const userService = new UsersService();
dotenv.config();
const app = express();

async function generateToken(user) {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtPayload = {
        'id': user.id,
        'identifier': user.email,
        'name': user.name,
        'phone': user.phone
    };
    const jwtToken = jwt.sign(jwtPayload, jwtSecret, {expiresIn: '1h'}); // expires in 1 hour
    const encodedToken = base64url.encode(jwtToken);
    return `${encodedToken}`;
}

async function getJwtForValidUser(username, password) {
    try {
        const user = await userService.getUserByPassword(username, password);
        return await generateToken(user);
    } catch (e) {
        throw e;
    }

}

app.post('/login', async (req, res) => {
    const initialPassKey = req.headers['x-initial-pass-key'];
    const identifier = req.body.identifier; // email
    const password = req.body.password;

    const initialPassKeyEnv = process.env.PASS_KEY;
    if (initialPassKeyEnv !== initialPassKey) {
        res.status(401).send('Unauthorized');
        return;
    }
    try {
        const bearerToken = await getJwtForValidUser(identifier, password);
        res.status(200)
            .json(bearerToken);
    } catch (e) {
        console.log(e);
        res.status(401).send(e.message);
    }
});

app.get('/details', async (req, res) => {
    var token = req.headers.authorization.split(' ')[1];
    token=base64url.decode(token);
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const decodedToken = await jwt.verify(token, jwtSecret);
        res.status(200)
            .json(decodedToken);
    } catch (e) {
        console.log(e);
        res.status(401).send('Invalid Token');
    }
});


export default app;


