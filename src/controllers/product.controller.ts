import { Request, Response } from 'express';
import { Product } from '@models';
import { cacheSet, cacheGet, cacheDelete } from '@utils';

// Helper function to handle responses
const handleResponse = (res: Response, status: number, message?: any) => {
  return res.status(status).json(message);
};

// Validate ID helper function
const validateId = (id: string) => !id || isNaN(Number(id));

// Create a product
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  const { name, description, price, stock } = req.body;

  if (!name || !description || price === undefined || stock === undefined) {
    return handleResponse(res, 400, { message: 'All fields are required' });
  }

  try {
    const newProduct = await Product.create({ name, description, price, stock });
    await cacheDelete('products'); // Invalidate cache for products
    return handleResponse(res, 201, newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return handleResponse(res, 500, { message: 'Error creating product' });
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  const cachedProducts = await cacheGet('products');

  if (cachedProducts) {
    return handleResponse(res, 200, cachedProducts); // Return cached products
  }

  try {
    const products = await Product.findAll();
    await cacheSet('products', products); // Cache the products
    return handleResponse(res, 200, products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return handleResponse(res, 500, { message: 'Error fetching products' });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (validateId(id)) {
    return handleResponse(res, 400, { message: 'Invalid product ID' });
  }

  const cacheKey = `product_${id}`;
  const cachedProduct = await cacheGet(cacheKey);

  if (cachedProduct) {
    return handleResponse(res, 200, cachedProduct); // Return cached product
  }

  try {
    const product = await Product.findByPk(id);
    if (product) {
      await cacheSet(cacheKey, product); // Cache the product
      return handleResponse(res, 200, product);
    }
    return handleResponse(res, 404, { message: 'Product not found' });
  } catch (error) {
    console.error('Error fetching product:', error);
    return handleResponse(res, 500, { message: 'Error fetching product' });
  }
};

// Update an existing product
// Update an existing product
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
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
    const [updated] = await Product.update({ name, description, price, stock }, {
      where: { id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      await cacheSet(cacheKey, updatedProduct); // Cache updated product
      await cacheDelete('products'); // Invalidate products cache
      return handleResponse(res, 200, updatedProduct);
    }
    return handleResponse(res, 404, { message: 'Product not found' });
  } catch (error) {
    console.error('Error updating product:', error);
    return handleResponse(res, 500, { message: 'Error updating product' });
  }
};


// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (validateId(id)) {
    return handleResponse(res, 400, { message: 'Invalid product ID' });
  }

  try {
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      await cacheDelete(`product_${id}`); // Invalidate cached product
      await cacheDelete('products'); // Invalidate products cache
      return res.status(204).send();
    }
    return handleResponse(res, 404, { message: 'Product not found' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return handleResponse(res, 500, { message: 'Error deleting product' });
  }
};
