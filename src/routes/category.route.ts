// import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog  } from '@controllers';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '@controllers';
import { Router } from 'express';


const categoryRouter = Router();

categoryRouter.post('/create', createCategory);
categoryRouter.get('/getAll', getCategories);
categoryRouter.get('/get/:id', getCategoryById);
categoryRouter.put('/update/:id', updateCategory);
categoryRouter.delete('/delete/:id', deleteCategory);

export  {categoryRouter};
