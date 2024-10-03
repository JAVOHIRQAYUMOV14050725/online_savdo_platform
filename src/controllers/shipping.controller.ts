// src/controllers/shipping.controller.ts

import { Request, Response } from 'express';
import { Shipping } from '@models';
import { cacheGet, cacheSet, cacheDelete } from '@utils'; // Import your caching functions

// To'lov yaratish
export const createShipping = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, orderId, address, shippingMethod } = req.body;

    const newShipping = await Shipping.create({
      userId,
      orderId,
      address,
      shippingMethod,
      shippingStatus: 'pending', 
    });

    // Cache the new shipping record
    await cacheSet(`shipping_${newShipping.id}`, newShipping);

    return res.status(201).json({ message: "Yetkazib berish muvaffaqiyatli yaratildi", shipping: newShipping });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Yetkazib berishni yaratishda xatolik yuz berdi" });
    }
  }
};

// Barcha yetkazib berishlarni olish
export const getAllShippings = async (req: Request, res: Response): Promise<Response> => {
  const cacheKey = 'all_shippings';

  try {
    // Check cache first
    const cachedShippings = await cacheGet(cacheKey);
    if (cachedShippings) {
      return res.json(cachedShippings); // Return cached results
    }

    const shippings = await Shipping.findAll();
    await cacheSet(cacheKey, shippings); // Cache the fetched results

    return res.json(shippings);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Yetkazib berishlarni olishda xatolik yuz berdi" });
    }
  }
};

// Yetkazib berishni ID bo'yicha olish
export const getShippingById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const cacheKey = `shipping_${id}`;

  try {
    // Check cache first
    const cachedShipping = await cacheGet(cacheKey);
    if (cachedShipping) {
      return res.json(cachedShipping); // Return cached result
    }

    const shipping = await Shipping.findByPk(id);
    if (!shipping) {
      return res.status(404).json({ error: "Yetkazib berish topilmadi" });
    }

    await cacheSet(cacheKey, shipping); // Cache the fetched shipping record
    return res.json(shipping);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Yetkazib berishni olishda xatolik yuz berdi" });
    }
  }
};

// Yetkazib berishni yangilash
export const updateShipping = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { shippingStatus } = req.body;

  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping) {
      return res.status(404).json({ error: "Yetkazib berish topilmadi" });
    }

    shipping.shippingStatus = shippingStatus;
    await shipping.save();

    // Invalidate the cache
    await cacheDelete(`shipping_${id}`);
    await cacheSet(`shipping_${id}`, shipping); // Optionally cache the updated shipping

    return res.json({ message: "Yetkazib berish holati yangilandi", shipping });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Yetkazib berish holatini yangilashda xatolik yuz berdi" });
    }
  }
};

// Yetkazib berishni o'chirish
export const deleteShipping = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping) {
      return res.status(404).json({ error: "Yetkazib berish topilmadi" });
    }

    await shipping.destroy();
    
    // Invalidate the cache
    await cacheDelete(`shipping_${id}`);
    
    // Optionally invalidate all shippings cache
    await cacheDelete('all_shippings');

    return res.json({ message: "Yetkazib berish o'chirildi" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Yetkazib berishni o'chirishda xatolik yuz berdi" });
    }
  }
};
