import { asyncHandler } from "../utils/AsyncHandler.js";
import { createCategory, getCategory, getCategoryForAdmin, updateCategory, updateCategoryStatus } from '../service/category.service.js'
import { sendSuccess } from "../utils/apiResponse.js";

const createCategoryController = asyncHandler(async (req, res) => {
    const category = await createCategory(req.body);

    return sendSuccess(res, {
        statusCode: 201,
        message: 'Category created successfully',
        data: category
    });
});


const getCategoryController = asyncHandler(async (req, res) => {
    const result = await getCategory();

    return sendSuccess(res, {
        message: 'Categories fetched successfully',
        data: result
    });
});

const getCategoryForAdminController = asyncHandler(async (req, res) => {
    const result = await getCategoryForAdmin();
    return sendSuccess(res, {
        message: 'Categories fetched successfully',
        data: result
    });
})

const updateCategoryController = asyncHandler(async (req, res) => {
    const result = await updateCategory(req.params.id, req.body)
    return sendSuccess(res, {
        message: 'Category updated successfully',
        data: result
    })
})
const updateCategoryStatusController = asyncHandler(async (req, res) => {
    const result = await updateCategoryStatus(req.params.id, req.body);
    return sendSuccess(res, {
        message: 'Category status updated successfully',
        data: result
    })
})
export {
    createCategoryController,
    getCategoryController,
    getCategoryForAdminController,
    updateCategoryController,
    updateCategoryStatusController
};