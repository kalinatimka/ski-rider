import DBUser from '../models/user.model';

export default class UserService {
    public async getAllUsers() {
        try {
            return await DBUser.findAll();
        } catch (e) {
            console.error(`Method: "getAllUsers". Message: ${e.message}`);
        }
    }

    public async findUserByLogin(login: string) {
        try {
            return await DBUser.findOne({
                where: { login }
            });
        } catch (e) {
            console.error(`Method: "findUserByLogin". Arguments: login - ${login}. Message: ${e.message}`);
        }
    }
}
