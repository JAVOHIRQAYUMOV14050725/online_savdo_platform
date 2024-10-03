import { Request, Response } from 'express';
import { UserAnalytics, OrderAnalytics, ProductSales, SiteVisits } from '@models';
import { cacheSet, cacheGet } from '@utils';

export const getUserAnalytics = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cacheKey = 'userAnalytics';
    const cachedUserAnalytics = await cacheGet(cacheKey);

    if (cachedUserAnalytics) {
      return res.status(200).json({
        success: true,
        message: 'Foydalanuvchi analitik ma\'lumotlari cache\'dan olingan',
        data: cachedUserAnalytics,
      });
    }

    const userAnalytics = await UserAnalytics.findOne();
    if (userAnalytics) {
      await cacheSet(cacheKey, userAnalytics);
      return res.status(200).json(userAnalytics);
    } else {
      return res.status(404).json({ error: "Foydalanuvchi analitik ma'lumotlari topilmadi" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Foydalanuvchi analitik ma'lumotlarni olishda xatolik yuz berdi" });
  }
};

export const getOrderAnalytics = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cacheKey = 'orderAnalytics';
    const cachedOrderAnalytics = await cacheGet(cacheKey);

    if (cachedOrderAnalytics) {
      return res.status(200).json({
        success: true,
        message: 'Buyurtma analitik ma\'lumotlari cache\'dan olingan',
        data: cachedOrderAnalytics,
      });
    }

    const orderAnalytics = await OrderAnalytics.findOne();
    if (orderAnalytics) {
      await cacheSet(cacheKey, orderAnalytics);
      return res.status(200).json(orderAnalytics);
    } else {
      return res.status(404).json({ error: "Buyurtma analitik ma'lumotlari topilmadi" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Buyurtma analitik ma'lumotlarni olishda xatolik yuz berdi" });
  }
};

export const getProductSales = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cacheKey = 'productSales';
    const cachedProductSales = await cacheGet(cacheKey);

    if (cachedProductSales) {
      return res.status(200).json({
        success: true,
        message: 'Mahsulot sotilishi analitik ma\'lumotlari cache\'dan olingan',
        data: cachedProductSales,
      });
    }

    const productSales = await ProductSales.findOne();
    if (productSales) {
      await cacheSet(cacheKey, productSales);
      return res.status(200).json(productSales);
    } else {
      return res.status(404).json({ error: "Mahsulot sotilishi analitik ma'lumotlari topilmadi" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Mahsulot sotilishi analitik ma'lumotlarni olishda xatolik yuz berdi" });
  }
};

export const getSiteVisits = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cacheKey = 'siteVisits';
    const cachedSiteVisits = await cacheGet(cacheKey);

    if (cachedSiteVisits) {
      return res.status(200).json({
        success: true,
        message: 'Saytga tashriflar analitik ma\'lumotlari cache\'dan olingan',
        data: cachedSiteVisits,
      });
    }

    const siteVisits = await SiteVisits.findOne();
    if (siteVisits) {
      await cacheSet(cacheKey, siteVisits);
      return res.status(200).json(siteVisits);
    } else {
      return res.status(404).json({ error: "Saytga tashriflar analitik ma'lumotlari topilmadi" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Saytga tashriflar analitik ma'lumotlarni olishda xatolik yuz berdi" });
  }
};
