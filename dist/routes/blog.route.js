"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const blogRouter = (0, express_1.Router)();
exports.blogRouter = blogRouter;
blogRouter.post('/create', _controllers_1.createBlog);
blogRouter.get('/getAll', _controllers_1.getAllBlogs);
blogRouter.get('/get/:id', _controllers_1.getBlogById);
blogRouter.put('/update/:id', _controllers_1.updateBlog);
blogRouter.delete('/delete/:id', _controllers_1.deleteBlog);
//# sourceMappingURL=blog.route.js.map