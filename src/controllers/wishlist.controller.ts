import { Request, Response } from 'express';
import { Wishlist } from '@models';
import { cacheGet, cacheSet, cacheDelete } from '@utils';

export const createWishlist = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, productId } = req.body;

    const newWishlist = await Wishlist.create({ userId, productId });

    // Yangi wishlistni keshga qo'shamiz
    await cacheSet(`wishlist_${newWishlist.id}`, newWishlist);

    return res.status(201).json({ message: "Wishlist muvaffaqiyatli yaratildi", wishlist: newWishlist });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Wishlistni yaratishda xatolik yuz berdi" });
    }
  }
};

export const getAllWishlists = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cachedWishlists = await cacheGet('all_wishlists');
    if (cachedWishlists) {
      return res.status(200).json(cachedWishlists); 
    }

    const wishlists = await Wishlist.findAll();
    await cacheSet('all_wishlists', wishlists);

    return res.json(wishlists);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Wishlistsni olishda xatolik yuz berdi" });
    }
  }
};

export const getWishlistById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const cachedWishlist = await cacheGet(`wishlist_${id}`);
    if (cachedWishlist) {
      return res.status(200).json(cachedWishlist); 
    }

    const wishlist = await Wishlist.findByPk(id);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist topilmadi" });
    }

    // Wishlistni keshga qo'shamiz
    await cacheSet(`wishlist_${id}`, wishlist);
    return res.json(wishlist);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Wishlistni olishda xatolik yuz berdi" });
    }
  }
};

export const updateWishlist = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const wishlist = await Wishlist.findByPk(id);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist topilmadi" });
    }

    wishlist.productId = productId;
    await wishlist.save();

    // Yangilangan wishlistni keshga qo'shamiz
    await cacheSet(`wishlist_${id}`, wishlist);

    return res.json({ message: "Wishlist yangilandi", wishlist });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Wishlistni yangilashda xatolik yuz berdi" });
    }
  }
};

export const deleteWishlist = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findByPk(id);

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist topilmadi" });
    }

    await wishlist.destroy();

    await cacheDelete(`wishlist_${id}`);
    await cacheDelete('all_wishlists');

    return res.json({ message: "Wishlist o'chirildi" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Wishlistni o'chirishda xatolik yuz berdi" });
    }
  }
};
