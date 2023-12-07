import UsersService from "../services/UsersService";
import jwt from 'jsonwebtoken';
const userService = new UsersService();

describe("Test User Services", () => {
    it('should be select user and password', async () => {
        const user = await userService.getUserByPassword("kokohbudi@gmail.com", "kozaninja");
        expect(user.password).toBe("kozaninja");
    });

    it('should throw an error for invalid passwords', async () => {
        try {
            await userService.getUserByPassword('kokohbudi@gmail.com', 'wrongpassword');
        } catch (error) {
            expect(error.message).toBe('User not found');
        }
    });

    it("jwt", async () => {
       const json = {
           "id": "sibebek"
       };
         const jwtSecret = "secret";

        const token = jwt.sign(
            json,
            'secret'
        );

    });


});