import {prisma} from "../util/prisma-client.js"

class UsersService {
    async getUserByPassword(username, password) {
        return prisma.users.findUnique({
            where: {
                email: username,
                password: password
            }
        });
    }
}
export default UsersService;
