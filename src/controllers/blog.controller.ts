import { Request, Response } from 'express';
import { Blog } from '@models';
import { cacheSet, cacheGet } from '@utils'; 

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    
    const newBlog = await Blog.create({ title, content, authorId });
    
    // Optionally, you can cache the newly created blog
    await cacheSet(`blog:${newBlog.id}`, newBlog);

    return res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ message: 'Error creating blog' });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'allBlogs';
    const cachedBlogs = await cacheGet(cacheKey);

    if (cachedBlogs) {
      // Return cached blogs if available
      return res.status(200).json(cachedBlogs);
    }

    const blogs = await Blog.findAll();
    
    // Cache the retrieved blogs
    await cacheSet(cacheKey, blogs);

    return res.status(200).json(blogs);
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    return res.status(500).json({ message: 'Error retrieving blogs' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const cacheKey = `blog:${id}`;
    
    const cachedBlog = await cacheGet(cacheKey);
    if (cachedBlog) {
      return res.status(200).json(cachedBlog);
    }

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Cache the retrieved blog
    await cacheSet(cacheKey, blog);

    return res.status(200).json(blog);
  } catch (error) {
    console.error('Error retrieving blog:', error);
    return res.status(500).json({ message: 'Error retrieving blog' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, content, authorId } = req.body;
    
    const [updated] = await Blog.update(
      { title, content, authorId },
      { where: { id } }
    );
    
    if (!updated) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    const updatedBlog = await Blog.findByPk(id);

    // Update the cache with the new blog data
    await cacheSet(`blog:${id}`, updatedBlog);

    return res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({ message: 'Error updating blog' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const blog = await Blog.findByPk(id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    await blog.destroy();

    // Optionally, delete the blog from the cache
    await cacheSet(`blog:${id}`, null);

    return res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({ message: 'Error deleting blog' });
  }
};
