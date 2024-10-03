import { Request, Response } from 'express';
import { OrderItem } from '@models';
import { cacheGet, cacheSet, cacheDelete } from '@utils'; // Import cache functions
import { createClient } from 'redis';

const redis = createClient(); // Create a Redis client
const CACHE_EXPIRY = 3600; // Cache expiry time in seconds

export const createOrderItem = async (req: Request, res: Response) => {
  const { orderId, productId, quantity, price } = req.body;

  try {
    const newOrderItem = await OrderItem.create({ orderId, productId, quantity, price });

    await cacheSet(`orderItem:${newOrderItem.id}`, newOrderItem, CACHE_EXPIRY);

    return res.status(201).json(newOrderItem);
  } catch (error) {
    console.error('Error creating order item:', error);
    return res.status(500).json({ message: 'Error creating order item' });
  }
};

export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const cachedOrderItems = await cacheGet('orderItems');

    if (cachedOrderItems) {
      return res.status(200).json(cachedOrderItems); // Return cached order items if available
    }

    const orderItems = await OrderItem.findAll();
    
    await cacheSet('orderItems', orderItems, CACHE_EXPIRY);

    return res.status(200).json(orderItems);
  } catch (error) {
    console.error('Error fetching order items:', error);
    return res.status(500).json({ message: 'Error fetching order items' });
  }
};

export const getOrderItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cachedOrderItem = await cacheGet(`orderItem:${id}`);
    if (cachedOrderItem) {
      return res.status(200).json(cachedOrderItem); // Return cached order item if available
    }

    const orderItem = await OrderItem.findByPk(id);
    if (orderItem) {
      await cacheSet(`orderItem:${id}`, orderItem, CACHE_EXPIRY);
      return res.status(200).json(orderItem);
    } else {
      return res.status(404).json({ message: 'Order item not found' });
    }
  } catch (error) {
    console.error('Error fetching order item:', error);
    return res.status(500).json({ message: 'Error fetching order item' });
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderId, productId, quantity, price } = req.body;

  try {
    const [updated] = await OrderItem.update({ orderId, productId, quantity, price }, {
      where: { id },
    });
    if (updated) {
      const updatedOrderItem = await OrderItem.findByPk(id);

      await cacheSet(`orderItem:${id}`, updatedOrderItem, CACHE_EXPIRY);

      return res.status(200).json(updatedOrderItem);
    } else {
      return res.status(404).json({ message: 'Order item not found' });
    }
  } catch (error) {
    console.error('Error updating order item:', error);
    return res.status(500).json({ message: 'Error updating order item' });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await OrderItem.destroy({
      where: { id },
    });
    if (deleted) {
      await cacheDelete(`orderItem:${id}`);

      return res.status(204).send(); // No content
    } else {
      return res.status(404).json({ message: 'Order item not found' });
    }
  } catch (error) {
    console.error('Error deleting order item:', error);
    return res.status(500).json({ message: 'Error deleting order item' });
  }
};
