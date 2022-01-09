import DBCategory from '../models/category.model';

export default class CategoryService {
    public async getAllCategories() {
        try {
            return await DBCategory.findAll();
        } catch (e) {
            console.error(`Method: "getAllCategories". Message: ${e.message}`);
        }
    }
}
