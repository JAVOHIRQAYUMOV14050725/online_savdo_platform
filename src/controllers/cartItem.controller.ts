// src/controllers/cartItemController.ts

import { Request, Response } from 'express';
import { CartItem } from '@models'; // CartItem modelini import qilamiz
import { cacheSet, cacheGet } from '@utils'; // Cache utilini import qilamiz

// Create a new cart item
export const createCartItem = async (req: Request, res: Response) => {
  try {
    const { cartId, productId, quantity } = req.body;
    
    // Yangi cart item yaratamiz
    const newCartItem = await CartItem.create({ cartId, productId, quantity });
    
    // Keshga saqlash
    await cacheSet(`cartItem:${newCartItem.id}`, newCartItem);
    
    return res.status(201).json(newCartItem);
  } catch (error) {
    console.error('Error creating cart item:', error);
    return res.status(500).json({ message: 'Error creating cart item' });
  }
};

// Get all cart items
export const getAllCartItems = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'cartItems';
    
    // Keshdan ma'lumotni olish
    const cachedCartItems = await cacheGet(cacheKey);
    
    if (cachedCartItems) {
      return res.status(200).json(cachedCartItems);
    }

    const cartItems = await CartItem.findAll();
    
    // Keshga saqlash
    await cacheSet(cacheKey, cartItems);

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    return res.status(500).json({ message: 'Error retrieving cart items' });
  }
};

// Get a cart item by ID
export const getCartItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Cart itemni ID bo'yicha topamiz
    const cacheKey = `cartItem:${id}`;
    const cachedCartItem = await cacheGet(cacheKey);
    
    if (cachedCartItem) {
      return res.status(200).json(cachedCartItem);
    }

    const cartItem = await CartItem.findByPk(id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Keshga saqlash
    await cacheSet(cacheKey, cartItem);
    
    return res.status(200).json(cartItem);
  } catch (error) {
    console.error('Error retrieving cart item:', error);
    return res.status(500).json({ message: 'Error retrieving cart item' });
  }
};

// Update a cart item by ID
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cartId, productId, quantity } = req.body;
    
    const cartItem = await CartItem.findByPk(id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    // Cart itemni yangilaymiz
    cartItem.cartId = cartId ?? cartItem.cartId;
    cartItem.productId = productId ?? cartItem.productId;
    cartItem.quantity = quantity ?? cartItem.quantity;
    
    await cartItem.save();
    
    // Yangilangan cart itemni keshga saqlash
    await cacheSet(`cartItem:${cartItem.id}`, cartItem);
    
    return res.status(200).json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ message: 'Error updating cart item' });
  }
};

// Delete a cart item by ID
export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const cartItem = await CartItem.findByPk(id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    await cartItem.destroy();
    
    // Keshdan o'chirish
    await cacheSet(`cartItem:${id}`, null);
    
    return res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return res.status(500).json({ message: 'Error deleting cart item' });
  }
};
