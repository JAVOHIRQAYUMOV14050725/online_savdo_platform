"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
// import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog  } from '@controllers';
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter.post('/create', _controllers_1.createCategory);
categoryRouter.get('/getAll', _controllers_1.getCategories);
categoryRouter.get('/get/:id', _controllers_1.getCategoryById);
categoryRouter.put('/update/:id', _controllers_1.updateCategory);
categoryRouter.delete('/delete/:id', _controllers_1.deleteCategory);
//# sourceMappingURL=category.route.js.map