import { Request, Response } from 'express';
import { Cart } from '@models'; // Cart modelini import qilamiz
import { cacheSet, cacheGet } from '@utils'; // Cache utility functions

// Create a new cart
export const createCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    // Yangi cart yaratamiz
    const newCart = await Cart.create({ userId });
    
    // Cache the newly created cart
    await cacheSet(`cart:${newCart.id}`, newCart);

    return res.status(201).json(newCart);
  } catch (error) {
    console.error('Error creating cart:', error);
    return res.status(500).json({ message: 'Error creating cart' });
  }
};

// Get all carts
export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'allCarts';
    const cachedCarts = await cacheGet(cacheKey);

    if (cachedCarts) {
      return res.status(200).json({
        success: true,
        message: 'Carts successfully fetched from cache',
        data: cachedCarts
      });
    }

    const carts = await Cart.findAll();

    // Cache the retrieved carts
    await cacheSet(cacheKey, carts);

    return res.status(200).json({
      success: true,
      message: 'Carts successfully fetched',
      data: carts
    });
  } catch (error) {
    console.error('Error retrieving carts:', error);
    return res.status(500).json({ message: 'Error retrieving carts' });
  }
};

// Get a cart by ID
export const getCartById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Cartni ID bo'yicha topamiz
    const cacheKey = `cart:${id}`;
    const cachedCart = await cacheGet(cacheKey);

    if (cachedCart) {
      return res.status(200).json({
        success: true,
        message: 'Cart successfully fetched from cache',
        data: cachedCart
      });
    }

    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Cache the retrieved cart
    await cacheSet(cacheKey, cart);
    
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return res.status(500).json({ message: 'Error retrieving cart' });
  }
};

// Update a cart by ID
export const updateCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const cart = await Cart.findByPk(id);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Cartni yangilaymiz
    cart.userId = userId ?? cart.userId;

    await cart.save();

    // Update the cache with the new cart data
    await cacheSet(`cart:${id}`, cart);
    
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ message: 'Error updating cart' });
  }
};

// Delete a cart by ID
export const deleteCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const cart = await Cart.findByPk(id);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    await cart.destroy();

    // Optionally, delete the cart from the cache
    await cacheSet(`cart:${id}`, null);

    return res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting cart:', error);
    return res.status(500).json({ message: 'Error deleting cart' });
  }
};
