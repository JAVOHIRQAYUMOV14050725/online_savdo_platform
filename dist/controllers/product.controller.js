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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
// Helper function to handle responses
const handleResponse = (res, status, message) => {
    return res.status(status).json(message);
};
// Validate ID helper function
const validateId = (id) => !id || isNaN(Number(id));
// Create a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock } = req.body;
    if (!name || !description || price === undefined || stock === undefined) {
        return handleResponse(res, 400, { message: 'All fields are required' });
    }
    try {
        const newProduct = yield _models_1.Product.create({ name, description, price, stock });
        yield (0, _utils_1.cacheDelete)('products'); // Invalidate cache for products
        return handleResponse(res, 201, newProduct);
    }
    catch (error) {
        console.error('Error creating product:', error);
        return handleResponse(res, 500, { message: 'Error creating product' });
    }
});
exports.createProduct = createProduct;
// Get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedProducts = yield (0, _utils_1.cacheGet)('products');
    if (cachedProducts) {
        return handleResponse(res, 200, cachedProducts); // Return cached products
    }
    try {
        const products = yield _models_1.Product.findAll();
        yield (0, _utils_1.cacheSet)('products', products); // Cache the products
        return handleResponse(res, 200, products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return handleResponse(res, 500, { message: 'Error fetching products' });
    }
});
exports.getProducts = getProducts;
// Get a single product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (validateId(id)) {
        return handleResponse(res, 400, { message: 'Invalid product ID' });
    }
    const cacheKey = `product_${id}`;
    const cachedProduct = yield (0, _utils_1.cacheGet)(cacheKey);
    if (cachedProduct) {
        return handleResponse(res, 200, cachedProduct); // Return cached product
    }
    try {
        const product = yield _models_1.Product.findByPk(id);
        if (product) {
            yield (0, _utils_1.cacheSet)(cacheKey, product); // Cache the product
            return handleResponse(res, 200, product);
        }
        return handleResponse(res, 404, { message: 'Product not found' });
    }
    catch (error) {
        console.error('Error fetching product:', error);
        return handleResponse(res, 500, { message: 'Error fetching product' });
    }
});
exports.getProductById = getProductById;
// Update an existing product
// Update an existing product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    if (validateId(id)) {
        return handleResponse(res, 400, { message: 'Invalid product ID' });
    }
    if (!name && !description && price === undefined && stock === undefined) {
        return handleResponse(res, 400, { message: 'No fields to update' });
    }
    const cacheKey = `product_${id}`; // Declare cacheKey here
    try {
        const [updated] = yield _models_1.Product.update({ name, description, price, stock }, {
            where: { id },
        });
        if (updated) {
            const updatedProduct = yield _models_1.Product.findByPk(id);
            yield (0, _utils_1.cacheSet)(cacheKey, updatedProduct); // Cache updated product
            yield (0, _utils_1.cacheDelete)('products'); // Invalidate products cache
            return handleResponse(res, 200, updatedProduct);
        }
        return handleResponse(res, 404, { message: 'Product not found' });
    }
    catch (error) {
        console.error('Error updating product:', error);
        return handleResponse(res, 500, { message: 'Error updating product' });
    }
});
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (validateId(id)) {
        return handleResponse(res, 400, { message: 'Invalid product ID' });
    }
    try {
        const deleted = yield _models_1.Product.destroy({ where: { id } });
        if (deleted) {
            yield (0, _utils_1.cacheDelete)(`product_${id}`); // Invalidate cached product
            yield (0, _utils_1.cacheDelete)('products'); // Invalidate products cache
            return res.status(204).send();
        }
        return handleResponse(res, 404, { message: 'Product not found' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        return handleResponse(res, 500, { message: 'Error deleting product' });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.controller.js.map