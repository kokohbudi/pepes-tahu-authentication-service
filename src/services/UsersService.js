import {prisma} from "../util/prisma-client.js"
import BusinessException from "../exception/BusinessException.js";

class UsersService {
    async getUserByPassword(username, password) {

            const user = await prisma.users.findUnique({
                where: {
                    email: username,
                    password: password
                }
            });
            if(user){
                return user;
            }else{
                throw new BusinessException('Invalid username or password');
            }

    }
}
export default UsersService;
