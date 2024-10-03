// src/controllers/paymentController.ts
import { Request, Response } from 'express';
import { Payment } from '@models';
import { cacheGet, cacheSet, cacheDelete } from '@utils'; // Import cache functions
import { createClient } from 'redis';

const redis = createClient(); // Create a Redis client
const CACHE_EXPIRY = 3600; // Cache expiry time in seconds

// Helper function to handle errors
const handleError = (res: Response, error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown error occurred';
  res.status(500).json({ error: message });
};
// Create a payment
export const createPayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, orderId, amount, paymentMethod } = req.body;

    // Validate input data
    if (!userId || !orderId || !amount || !paymentMethod) {
      return res.status(400).json({ error: "Kerakli ma'lumotlar to'liq emas" });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "To'lov miqdori ijobiy bo'lishi kerak" });
    }

    const validPaymentMethods = ['credit_card', 'paypal', 'bank_transfer'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({ error: "Noto'g'ri to'lov usuli tanlangan" });
    }

    const newPayment = await Payment.create({
      userId,
      orderId,
      amount,
      paymentMethod,
      paymentStatus: 'pending',
    });

    await cacheSet(`payment:${newPayment.id}`, newPayment, CACHE_EXPIRY);
    return res.status(201).json({ message: "To'lov muvaffaqiyatli yaratildi", payment: newPayment });
  } catch (error) {
    handleError(res, error);
    return res.status(500); // Ensure to return a status even in case of error
  }
};

// Get all payments
export const getAllPayments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cachedPayments = await cacheGet('payments');
    if (cachedPayments) {
      return res.status(200).json(cachedPayments);
    }

    const payments = await Payment.findAll();
    await cacheSet('payments', payments, CACHE_EXPIRY);
    return res.status(200).json(payments);
  } catch (error) {
    handleError(res, error);
    return res.status(500); // Ensure to return a status even in case of error
  }
};

// Get a single payment by ID
export const getPaymentById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Noto'g'ri to'lov ID" });
    }

    const cachedPayment = await cacheGet(`payment:${id}`);
    if (cachedPayment) {
      return res.status(200).json(cachedPayment);
    }

    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: "To'lov topilmadi" });
    }

    await cacheSet(`payment:${id}`, payment, CACHE_EXPIRY);
    return res.status(200).json(payment);
  } catch (error) {
    handleError(res, error);
    return res.status(500); // Ensure to return a status even in case of error
  }
};

// Update a payment
export const updatePayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Noto'g'ri to'lov ID" });
    }

    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ error: "Noto'g'ri to'lov holati" });
    }

    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: "To'lov topilmadi" });
    }

    payment.paymentStatus = paymentStatus;
    await payment.save();
    await cacheSet(`payment:${id}`, payment, CACHE_EXPIRY);

    return res.status(200).json({ message: "To'lov holati yangilandi", payment });
  } catch (error) {
    handleError(res, error);
    return res.status(500); // Ensure to return a status even in case of error
  }
};

// Delete a payment
export const deletePayment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Noto'g'ri to'lov ID" });
    }

    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: "To'lov topilmadi" });
    }

    await payment.destroy();
    await cacheDelete(`payment:${id}`);

    return res.status(200).json({ message: "To'lov o'chirildi" });
  } catch (error) {
    handleError(res, error);
    return res.status(500); // Ensure to return a status even in case of error
  }
};
