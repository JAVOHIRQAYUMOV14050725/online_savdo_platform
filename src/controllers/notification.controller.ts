import { Request, Response } from 'express';
import { Notification } from '@models';
import { cacheGet, cacheSet } from '@utils';
import { createClient } from 'redis';

const redis = createClient();
const CACHE_EXPIRY = 3600;

// Xabar yaratish
export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, type, message, sentAt } = req.body;

    const newNotification = await Notification.create({
      userId,
      type,
      message,
      sentAt,
      isRead: false,
    });

    await cacheSet(`notification:${newNotification.id}`, newNotification, CACHE_EXPIRY);

    res.status(201).json({ message: "Xabar muvaffaqiyatli yaratildi", notification: newNotification });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Xabarni yaratishda xatolik yuz berdi" });
    }
  }
};

export const getAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Xabarnomalarni olishda xatolik yuz berdi" });
    }
  }
};

export const getNotificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cachedNotification = await cacheGet(`notification:${id}`);

    if (cachedNotification) {
      res.json(cachedNotification);
      return;
    }

    const notification = await Notification.findByPk(id);
    if (!notification) {
      res.status(404).json({ error: "Xabar topilmadi" });
      return;
    }

    await cacheSet(`notification:${id}`, notification, CACHE_EXPIRY);
    res.json(notification);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Xabarni olishda xatolik yuz berdi" });
    }
  }
};

export const markNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);

    if (!notification) {
      res.status(404).json({ error: "Xabar topilmadi" });
      return;
    }

    notification.isRead = true;
    await notification.save();

    await cacheSet(`notification:${id}`, notification, CACHE_EXPIRY);
    res.json({ message: "Xabar o'qilgan deb belgilandi", notification });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Xabarni o'qilgan deb belgilashda xatolik yuz berdi" });
    }
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);

    if (!notification) {
      res.status(404).json({ error: "Xabar topilmadi" });
      return;
    }

    await notification.destroy();
    await redis.del(`notification:${id}`);

    res.json({ message: "Xabar o'chirildi" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Xabarni o'chirishda xatolik yuz berdi" });
    }
  }
};
