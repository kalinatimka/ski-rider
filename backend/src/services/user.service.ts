import DBUser from '../models/user.model';

export default class UserService {
    public async getAllUsers() {
        try {
            return await DBUser.findAll();
        } catch (e) {
            console.error(`Method: "getAllUsers". Message: ${e.message}`);
        }
    }

    public async findUserByEmail(mail: string) {
        try {
            return await DBUser.findOne({
                where: { mail }
            });
        } catch (e) {
            console.error(`Method: "findUserByLogin". Arguments: mail - ${mail}. Message: ${e.message}`);
        }
    }

    public async createUser(
        mail: string,
        password: string,
        login: string,
        phone: string,
        avatar: string
    ) {
        try {
            return await DBUser.create({
                mail,
                password,
                login,
                phone,
                avatar
            });
        } catch (e) {
            console.error(`Method: "createUser". Arguments: mail - ${mail}, password - ${password}, phone - ${phone}, avatar - ${avatar}. Message: ${e.message}`);
        }
    }
}
