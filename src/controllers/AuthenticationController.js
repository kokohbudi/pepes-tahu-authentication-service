import express from 'express';
import dotenv from 'dotenv';
import UsersService from "../services/UsersService.js";
import BusinessException from "../exception/BusinessException.js";
import JWTUtil from "../util/JWTUtil.js";

const userService = new UsersService();
const jwtUtil = new JWTUtil();

dotenv.config();
const app = express();

async function generateToken(user) {
    const jwtPayload = {
        'id': user.id,
        'identifier': user.email,
        'name': user.name,
        'phone': user.phone
    };
     // expires in 1 hour
    return jwtUtil.generateToken(jwtPayload, '1h');
}

async function login(req,res) {
    const initialPassKey = req.headers['x-initial-pass-key'];
    const identifier = req.body.identifier; // email
    const password = req.body.password;

    const initialPassKeyEnv = process.env.PASS_KEY;
    if (initialPassKeyEnv !== initialPassKey) {
        res.status(401).send('Unauthorized');
        return;
    }
    try {
        const user = await userService.getUserByEmailAndPassword(identifier, password);
        const bearerToken = await generateToken(user);
        res.status(200)
            .json(bearerToken);
    } catch (e) {
        console.log(e);
        if(e instanceof BusinessException) {
            res.status(401).send(e.message);
        }else{
            res.status(500).send('Internal Server Error');
        }
    }
}

async function getDetailsByJWT(req, res) {
    var token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await jwtUtil.decodeToken(token);
        res.status(200)
            .json(decodedToken);
    } catch (e) {
        console.log(e);
        res.status(401).send('Invalid Token');
    }
}

app.get('/details', getDetailsByJWT);
app.post('/login', login);

export default app;


