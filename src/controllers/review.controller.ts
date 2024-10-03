// src/controllers/reviewController.ts
import { Request, Response } from 'express';
import { Review } from '@models';
import { cacheGet, cacheSet, cacheDelete } from '@utils'; // Import your caching functions

export const createReview = async (req: Request, res: Response) => {
  const { productId, userId, rating, comment } = req.body;

  if (!productId || !userId || rating === undefined) {
    return res.status(400).json({ message: 'Mahsulot ID, Foydalanuvchi ID va baho talab qilinadi' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Baho 1 dan 5 gacha bo\'lishi kerak' });
  }

  try {
    const newReview = await Review.create({ productId, userId, rating, comment });
    const cacheKey = `review_${newReview.id}`;
    await cacheSet(cacheKey, newReview); // Cache the new review
    return res.status(201).json(newReview);
  } catch (error) {
    console.error('Sharh yaratishda xato:', error);
    return res.status(500).json({ message: 'Sharh yaratishda xato yuz berdi' });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  const cacheKey = 'all_reviews';

  try {
    // Check if the reviews are in the cache
    const cachedReviews = await cacheGet(cacheKey);
    if (cachedReviews) {
      return res.status(200).json(cachedReviews); // Return cached reviews
    }

    const reviews = await Review.findAll();
    await cacheSet(cacheKey, reviews); // Cache the fetched reviews
    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Barcha sharhlarni olishda xato:', error);
    return res.status(500).json({ message: 'Sharhlarni olishda xato yuz berdi' });
  }
};

export const getReviewsByProductId = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId || isNaN(Number(productId))) {
    return res.status(400).json({ message: 'Yaroqsiz mahsulot ID' });
  }

  const cacheKey = `reviews_product_${productId}`;

  try {
    const cachedReviews = await cacheGet(cacheKey);
    if (cachedReviews) {
      return res.status(200).json(cachedReviews); // Return cached reviews
    }

    const reviews = await Review.findAll({ where: { productId } });
    await cacheSet(cacheKey, reviews); // Cache the fetched reviews
    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Sharhlarni olishda xato:', error);
    return res.status(500).json({ message: 'Sharhlarni olishda xato yuz berdi' });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Yaroqsiz sharh ID' });
  }

  const cacheKey = `review_${id}`;

  try {
    const cachedReview = await cacheGet(cacheKey);
    if (cachedReview) {
      return res.status(200).json(cachedReview); // Return cached review
    }

    const review = await Review.findByPk(id);
    if (review) {
      await cacheSet(cacheKey, review); // Cache the fetched review
      return res.status(200).json(review);
    } else {
      return res.status(404).json({ message: 'Sharh topilmadi' });
    }
  } catch (error) {
    console.error('Sharhni olishda xato:', error);
    return res.status(500).json({ message: 'Sharhni olishda xato yuz berdi' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Yaroqsiz sharh ID' });
  }
  if (rating === undefined && comment === undefined) {
    return res.status(400).json({ message: 'Yangilash uchun maydonlar yo\'q' });
  }

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return res.status(400).json({ message: 'Baho 1 dan 5 gacha bo\'lishi kerak' });
  }

  const cacheKey = `review_${id}`;

  try {
    const [updated] = await Review.update({ rating, comment }, {
      where: { id },
    });
    if (updated) {
      const updatedReview = await Review.findByPk(id);
      await cacheSet(cacheKey, updatedReview); // Cache the updated review
      return res.status(200).json(updatedReview);
    } else {
      return res.status(404).json({ message: 'Sharh topilmadi' });
    }
  } catch (error) {
    console.error('Sharhni yangilashda xato:', error);
    return res.status(500).json({ message: 'Sharhni yangilashda xato yuz berdi' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Yaroqsiz sharh ID' });
  }

  const cacheKey = `review_${id}`;

  try {
    const deleted = await Review.destroy({ where: { id } });
    if (deleted) {
      await cacheDelete(cacheKey); // Invalidate the cached review
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Sharh topilmadi' });
    }
  } catch (error) {
    console.error('Sharhni o\'chirishda xato:', error);
    return res.status(500).json({ message: 'Sharhni o\'chirishda xato yuz berdi' });
  }
};
