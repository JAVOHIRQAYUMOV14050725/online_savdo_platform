// src/controllers/coupon.controller.ts
import { Request, Response } from 'express';
import { Coupon } from '@models';
import { cacheGet, cacheSet } from '@utils';
import { redis } from '@config';

// Keshning amal qilish muddati
const CACHE_EXPIRY = 3600; // 1 soat

export const createCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, discount, expiryDate, isActive } = req.body;

    const newCoupon = await Coupon.create({
      code,
      discount,
      expiryDate,
      isActive,
    });

    // Yangi couponni keshga saqlash
    await cacheSet(`coupon:${newCoupon.id}`, newCoupon, CACHE_EXPIRY);

    res.status(201).json({ message: "Coupon muvaffaqiyatli yaratildi", coupon: newCoupon });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Couponni yaratishda xatolik yuz berdi" });
    }
  }
};

export const getAllCoupons = async (req: Request, res: Response): Promise<void> => {
  try {
    const coupons = await Coupon.findAll();
    res.json(coupons);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Couponlarni olishda xatolik yuz berdi" });
    }
  }
};

export const getCouponById = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const cachedCoupon = await cacheGet(`coupon:${id}`);

      if (cachedCoupon) {
          res.json(cachedCoupon); // Removed 'return'
          return; // Ensure the function exits after sending the response
      }

      const coupon = await Coupon.findByPk(id);
      if (!coupon) {
          res.status(404).json({ error: "Coupon topilmadi" });
          return;
      }

      await cacheSet(`coupon:${id}`, coupon, CACHE_EXPIRY);
      res.json(coupon);
  } catch (error) {
      if (error instanceof Error) {
          res.status(500).json({ error: error.message });
      } else {
          res.status(500).json({ error: "Couponni olishda xatolik yuz berdi" });
      }
  }
};


// Couponni yangilash
export const updateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { code, discount, expiryDate, isActive } = req.body;

    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      res.status(404).json({ error: "Coupon topilmadi" });
      return;
    }

    coupon.code = code;
    coupon.discount = discount;
    coupon.expiryDate = expiryDate;
    coupon.isActive = isActive;
    await coupon.save();

    // Yangilangan couponni keshga saqlash
    await cacheSet(`coupon:${id}`, coupon, CACHE_EXPIRY);
    res.json({ message: "Coupon yangilandi", coupon });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Couponni yangilashda xatolik yuz berdi" });
    }
  }
};

// Couponni o'chirish
export const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByPk(id);

    if (!coupon) {
      res.status(404).json({ error: "Coupon topilmadi" });
      return;
    }

    await coupon.destroy();
    // O'chirilgan couponni keshdan olib tashlash
    await redis.del(`coupon:${id}`);

    res.json({ message: "Coupon o'chirildi" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Couponni o'chirishda xatolik yuz berdi" });
    }
  }
};
