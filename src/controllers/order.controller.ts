
import { Request, Response } from 'express';
import { Order } from '@models'; // Import the Order model
import { cacheGet, cacheSet, cacheDelete } from '@utils';
import { createClient } from 'redis';

const redis = createClient(); // Create a Redis client
const CACHE_EXPIRY = 3600; // Cache expiry time in seconds

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, status, totalAmount } = req.body;

    const newOrder = await Order.create({ userId, status, totalAmount });

    await cacheSet(`order:${newOrder.id}`, newOrder, CACHE_EXPIRY);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cachedOrders = await cacheGet('orders');

    if (cachedOrders) {
      return res.status(200).json(cachedOrders); 
    }

    const orders = await Order.findAll();
    // Cache the fetched orders
    await cacheSet('orders', orders, CACHE_EXPIRY);

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ message: 'Error retrieving orders' });
  }
};

// Get an order by ID
export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    // Check if the order is cached
    const cachedOrder = await cacheGet(`order:${id}`);
    if (cachedOrder) {
      return res.status(200).json(cachedOrder); // Return cached order if available
    }

    // Find the order by ID
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Cache the fetched order
    await cacheSet(`order:${id}`, order, CACHE_EXPIRY);

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    return res.status(500).json({ message: 'Error retrieving order' });
  }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userId, status, totalAmount } = req.body;

    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order
    order.userId = userId ?? order.userId;
    order.status = status ?? order.status;
    order.totalAmount = totalAmount ?? order.totalAmount;

    await order.save();

    // Update the cached order
    await cacheSet(`order:${id}`, order, CACHE_EXPIRY);

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Error updating order' });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();

    // Delete the cached order
    await cacheDelete(`order:${id}`);

    return res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Error deleting order' });
  }
};
