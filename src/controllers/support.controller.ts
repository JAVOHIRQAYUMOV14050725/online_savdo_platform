// src/controllers/support.controller.ts

import { Request, Response } from 'express';
import { SupportRequest, SupportResponse } from '@models';
import { cacheGet, cacheSet, cacheDelete } from '@utils'; // Kesh funksiyalarini import qiling

// Murojaat yaratish
export const createSupportRequest = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, question } = req.body;

    const newRequest = await SupportRequest.create({
      userId,
      question,
    });

    // Keshda yangi murojaatni saqlash
    await cacheSet(`support_request_${newRequest.id}`, newRequest);

    return res.status(201).json({ message: "Murojaat muvaffaqiyatli yuborildi", request: newRequest });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Murojaatni yaratishda xatolik yuz berdi"
    });
  }
};

// Barcha mijoz murojaatlarini olish
export const getAllSupportRequests = async (req: Request, res: Response): Promise<Response> => {
  const cacheKey = 'all_support_requests';

  try {
    // Keshdan oldin tekshirish
    const cachedRequests = await cacheGet(cacheKey);
    if (cachedRequests) {
      return res.json(cachedRequests); // Keshdan qaytarish
    }

    const requests = await SupportRequest.findAll();
    await cacheSet(cacheKey, requests); // Olingan natijalarni keshga saqlash

    return res.json(requests);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Murojaatlarni olishda xatolik yuz berdi"
    });
  }
};

// Murojaat ID bo'yicha olish
export const getSupportRequestById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const cacheKey = `support_request_${id}`;

  try {
    // Keshdan oldin tekshirish
    const cachedRequest = await cacheGet(cacheKey);
    if (cachedRequest) {
      return res.json(cachedRequest); // Keshdan qaytarish
    }

    const request = await SupportRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Murojaat topilmadi" });
    }

    await cacheSet(cacheKey, request); // Olingan murojaatni keshga saqlash
    return res.json(request);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Murojaatni olishda xatolik yuz berdi"
    });
  }
};

// Murojaatni javob berilgan deb belgilash
export const respondToSupportRequest = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const request = await SupportRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Murojaat topilmadi" });
    }

    request.status = 'responded';
    await request.save();

    await SupportResponse.create({
      requestId: id,
      response,
    });

    // Keshni yangilash
    await cacheDelete(`support_request_${id}`);
    await cacheSet(`support_request_${id}`, request); // Yangilangan murojaatni keshga saqlash

    return res.json({ message: "Murojaatga javob berildi", request });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Javob berishda xatolik yuz berdi"
    });
  }
};

// Murojaatni yopish
export const closeSupportRequest = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const request = await SupportRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Murojaat topilmadi" });
    }

    request.status = 'closed';
    await request.save();

    // Keshni yangilash
    await cacheDelete(`support_request_${id}`);
    await cacheDelete('all_support_requests'); // Barcha murojaatlar keshini yangilash

    return res.json({ message: "Murojaat yopildi", request });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Murojaatni yopishda xatolik yuz berdi"
    });
  }
};

// Murojaatni o'chirish
export const deleteSupportRequest = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const request = await SupportRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: "Murojaat topilmadi" });
    }

    await request.destroy();

    // Keshni yangilash
    await cacheDelete(`support_request_${id}`);
    await cacheDelete('all_support_requests'); // Barcha murojaatlar keshini yangilash

    return res.json({ message: "Murojaat o'chirildi" });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Murojaatni o'chirishda xatolik yuz berdi"
    });
  }
};
