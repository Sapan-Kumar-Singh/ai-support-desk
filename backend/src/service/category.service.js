//Implement create, get active, get all, update, and status operations.
import Category from "../model/category.model.js"
import ApiError from "../utils/ApiError.js";
import { Op } from "sequelize";

const createCategory = async ({ name, description }) => {
    const existingCategory = await Category.findOne({
        where: { name }
    });

    if (existingCategory) {
        throw new ApiError(409, 'Category name already exists');
    }
    const result = await Category.create({ name, description });
    return result;
}

const getCategory = async () => {

    const result = await Category.findAll({
        where: { isActive: true },
        attributes: ['id', 'name', 'description'],
        order: [['name', 'ASC']]
    })
    return result;
}

const getCategoryForAdmin = async () => {
    const result = await Category.findAll();
    return result;
}


const updateCategory = async (id, payload) => {

    const existingCategory = await Category.findByPk(id);

    if (!existingCategory) {
        throw new ApiError(404, 'Category not found');
    }

    // Check duplicate name only if name is being updated
    if (payload.name) {
        const duplicateCategory = await Category.findOne({
            where: {
                name: payload.name,
                id: {
                    [Op.ne]: id
                }
            }
        });

        if (duplicateCategory) {
            throw new ApiError(409, 'Category name already exists');
        }
    }

    await existingCategory.update(payload);

    return existingCategory;
};

const updateCategoryStatus = async (id, payload) => {

    const existingCategory = await Category.findByPk(id);
    if (!existingCategory) {
        throw new ApiError(404, 'Category not found');
    }
    // Check whether status is already the same
    if (existingCategory.isActive === payload.isActive) {
        return existingCategory;
    }
    await existingCategory.update({
        isActive: payload.isActive
    });
    return existingCategory;
}
export { createCategory, getCategory, getCategoryForAdmin, updateCategory, updateCategoryStatus };