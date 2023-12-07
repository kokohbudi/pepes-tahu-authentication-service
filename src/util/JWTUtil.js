import base64url from 'base64url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class JWTUtil{
    async generateToken(payload, expiresIn){
        const jwtSecret = process.env.JWT_SECRET;
        const jwtToken = jwt.sign(payload, jwtSecret, {expiresIn: expiresIn}); // expires in 1 hour
        const encodedToken = base64url.encode(jwtToken);
        return `${encodedToken}`;
    }

    async decodeToken(token){
        token=base64url.decode(token);
        const jwtSecret = process.env.JWT_SECRET;
        try {
            return jwt.verify(token, jwtSecret);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
export default JWTUtil;