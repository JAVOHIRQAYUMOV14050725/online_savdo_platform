import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '@controllers';
import { Router } from 'express';


const blogRouter = Router();

blogRouter.post('/create', createBlog);
blogRouter.get('/getAll', getAllBlogs);
blogRouter.get('/get/:id', getBlogById);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/delete/:id', deleteBlog);

export  {blogRouter};
