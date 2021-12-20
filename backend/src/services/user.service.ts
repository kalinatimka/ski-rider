import DBUser from '../models/user.model';

export default class UserService {
    public async getAllUsers() {
        try {
            return await DBUser.findAll();
        } catch (e) {
            console.error(`Method: "getAllUsers". Message: ${e.message}`);
        }
    }
}
