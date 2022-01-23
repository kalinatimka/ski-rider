import DBCategory from '../db-models/category.model';

export default class CategoryService {
    public async getAllCategories() {
        try {
            return await DBCategory.findAll();
        } catch (e) {
            console.error(`Method: "getAllCategories". Message: ${e.message}`);
        }
    }

    public async getCategoryById(idCategory: string) {
        try {
            return await DBCategory.findOne({
                where: {
                    idCategory
                }
            });
        } catch (e) {
            console.error(`Method: "getAllCategories". Message: ${e.message}`);
        }
    }
}
