"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    // Validate input
    if (!name) {
        return res.status(400).json({ success: false, message: 'Category name is required' });
    }
    try {
        // Create a new category
        const newCategory = yield _models_1.Category.create({ name, description });
        // Cache the newly created category
        yield (0, _utils_1.cacheSet)(`category:${newCategory.id}`, newCategory);
        return res.status(201).json({
            success: true,
            message: 'Category successfully created',
            data: newCategory
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating category' });
    }
});
exports.createCategory = createCategory;
// Get all categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'allCategories';
        const cachedCategories = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedCategories) {
            // Return cached categories if available
            return res.status(200).json({
                success: true,
                message: 'Categories successfully fetched from cache',
                data: cachedCategories
            });
        }
        const categories = yield _models_1.Category.findAll();
        // Cache the retrieved categories
        yield (0, _utils_1.cacheSet)(cacheKey, categories);
        return res.status(200).json({
            success: true,
            message: 'Categories successfully fetched',
            data: categories
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching categories' });
    }
});
exports.getCategories = getCategories;
// Get a single category by ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }
    try {
        const cacheKey = `category:${id}`;
        const cachedCategory = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedCategory) {
            return res.status(200).json({
                success: true,
                message: 'Category successfully fetched from cache',
                data: cachedCategory
            });
        }
        const category = yield _models_1.Category.findByPk(id);
        if (category) {
            // Cache the retrieved category
            yield (0, _utils_1.cacheSet)(cacheKey, category);
            return res.status(200).json({
                success: true,
                message: 'Category successfully fetched',
                data: category
            });
        }
        else {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching category' });
    }
});
exports.getCategoryById = getCategoryById;
// Update an existing category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    // Validate ID and input
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }
    if (!name && !description) {
        return res.status(400).json({ success: false, message: 'No fields to update' });
    }
    try {
        const [updated] = yield _models_1.Category.update({ name, description }, {
            where: { id },
        });
        if (updated) {
            const updatedCategory = yield _models_1.Category.findByPk(id);
            // Update the cache with the new category data
            yield (0, _utils_1.cacheSet)(`category:${id}`, updatedCategory);
            return res.status(200).json({
                success: true,
                message: 'Category successfully updated',
                data: updatedCategory
            });
        }
        else {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error updating category' });
    }
});
exports.updateCategory = updateCategory;
// Delete a category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }
    try {
        const deleted = yield _models_1.Category.destroy({ where: { id } });
        if (deleted) {
            // Optionally, delete the category from the cache
            yield (0, _utils_1.cacheSet)(`category:${id}`, null);
            return res.status(200).json({
                success: true,
                message: 'Category successfully deleted'
            });
        }
        else {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error deleting category' });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map