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
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const _models_1 = require("../models");
const _utils_1 = require("../utils");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, authorId } = req.body;
        const newBlog = yield _models_1.Blog.create({ title, content, authorId });
        yield (0, _utils_1.cacheSet)(`blog:${newBlog.id}`, newBlog);
        return res.status(201).json(newBlog);
    }
    catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({ message: 'Error creating blog' });
    }
});
exports.createBlog = createBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'allBlogs';
        const cachedBlogs = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedBlogs) {
            // Return cached blogs if available
            return res.status(200).json(cachedBlogs);
        }
        const blogs = yield _models_1.Blog.findAll();
        // Cache the retrieved blogs
        yield (0, _utils_1.cacheSet)(cacheKey, blogs);
        return res.status(200).json(blogs);
    }
    catch (error) {
        console.error('Error retrieving blogs:', error);
        return res.status(500).json({ message: 'Error retrieving blogs' });
    }
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const cacheKey = `blog:${id}`;
        const cachedBlog = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedBlog) {
            return res.status(200).json(cachedBlog);
        }
        const blog = yield _models_1.Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Cache the retrieved blog
        yield (0, _utils_1.cacheSet)(cacheKey, blog);
        return res.status(200).json(blog);
    }
    catch (error) {
        console.error('Error retrieving blog:', error);
        return res.status(500).json({ message: 'Error retrieving blog' });
    }
});
exports.getBlogById = getBlogById;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const { title, content, authorId } = req.body;
        const [updated] = yield _models_1.Blog.update({ title, content, authorId }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const updatedBlog = yield _models_1.Blog.findByPk(id);
        // Update the cache with the new blog data
        yield (0, _utils_1.cacheSet)(`blog:${id}`, updatedBlog);
        return res.status(200).json(updatedBlog);
    }
    catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json({ message: 'Error updating blog' });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const blog = yield _models_1.Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        yield blog.destroy();
        // Optionally, delete the blog from the cache
        yield (0, _utils_1.cacheSet)(`blog:${id}`, null);
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ message: 'Error deleting blog' });
    }
});
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=blog.controller.js.map