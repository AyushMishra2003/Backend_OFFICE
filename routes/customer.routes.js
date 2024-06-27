import { Router } from 'express';
import { addCustomersFromExcel, getCustomer } from '../controller/customer.controller.js';
import upload from '../middleware/multer.middleware.js';

const router = Router();

router.post('/', upload.single('file'), addCustomersFromExcel);
router.get('/', getCustomer);

export default router;
