
import { createReview, deleteReview, getAllReviews, getReviewById, getReviewsByProductId, updateReview } from '@controllers';
import { Router } from 'express';


const reviewRouter = Router();

reviewRouter.post('/create', createReview);
reviewRouter.get('/get/:id', getReviewById);
reviewRouter.get('/getAll', getAllReviews);
reviewRouter.get('/getByPro/:productId', getReviewsByProductId);
reviewRouter.put('/update/:id', updateReview);
reviewRouter.delete('/delete/:id', deleteReview);

export  {reviewRouter};
