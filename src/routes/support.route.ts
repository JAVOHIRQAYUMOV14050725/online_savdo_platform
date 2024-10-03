import { Router } from 'express';
import {
  createSupportRequest,
  getAllSupportRequests,
  getSupportRequestById,
  respondToSupportRequest,
  closeSupportRequest,
  deleteSupportRequest
} from '@controllers';

const supportRouter = Router();


supportRouter.post('/create', createSupportRequest);
supportRouter.get('/getAll', getAllSupportRequests);
supportRouter.get('/get/:id', getSupportRequestById);
supportRouter.post('/:id/respond', respondToSupportRequest);
supportRouter.post('/:id/close', closeSupportRequest);
supportRouter.delete('/:id', deleteSupportRequest);

export  {supportRouter};
