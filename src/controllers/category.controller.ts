import { Request, Response } from 'express';
import { Category } from '@models';
import { cacheSet, cacheGet } from '@utils'; // Cache utility functions

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ success: false, message: 'Category name is required' });
  }

  try {
    // Create a new category
    const newCategory = await Category.create({ name, description });
    
    // Cache the newly created category
    await cacheSet(`category:${newCategory.id}`, newCategory);

    return res.status(201).json({
      success: true,
      message: 'Category successfully created',
      data: newCategory
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating category' });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'allCategories';
    const cachedCategories = await cacheGet(cacheKey);

    if (cachedCategories) {
      // Return cached categories if available
      return res.status(200).json({
        success: true,
        message: 'Categories successfully fetched from cache',
        data: cachedCategories
      });
    }

    const categories = await Category.findAll();

    // Cache the retrieved categories
    await cacheSet(cacheKey, categories);

    return res.status(200).json({
      success: true,
      message: 'Categories successfully fetched',
      data: categories
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching categories' });
  }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, message: 'Invalid category ID' });
  }

  try {
    const cacheKey = `category:${id}`;
    const cachedCategory = await cacheGet(cacheKey);

    if (cachedCategory) {
      return res.status(200).json({
        success: true,
        message: 'Category successfully fetched from cache',
        data: cachedCategory
      });
    }

    const category = await Category.findByPk(id);
    if (category) {
      // Cache the retrieved category
      await cacheSet(cacheKey, category);
      
      return res.status(200).json({
        success: true,
        message: 'Category successfully fetched',
        data: category
      });
    } else {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching category' });
  }
};

// Update an existing category
export const updateCategory = async (req: Request, res: Response) => {
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
    const [updated] = await Category.update({ name, description }, {
      where: { id },
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      
      // Update the cache with the new category data
      await cacheSet(`category:${id}`, updatedCategory);

      return res.status(200).json({
        success: true,
        message: 'Category successfully updated',
        data: updatedCategory
      });
    } else {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating category' });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, message: 'Invalid category ID' });
  }

  try {
    const deleted = await Category.destroy({ where: { id } });
    if (deleted) {
      // Optionally, delete the category from the cache
      await cacheSet(`category:${id}`, null);

      return res.status(200).json({
        success: true,
        message: 'Category successfully deleted'
      });
    } else {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting category' });
  }
};
