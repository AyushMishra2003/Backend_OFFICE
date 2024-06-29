import { Router } from 'express';
import { addCustomersFromExcel, getAllCustomer, getCustomers } from '../controller/customer.controller.js';
import upload from '../middleware/multer.middleware.js';
import { getAllDocument, uploadCVAndPhoto } from '../controller/document.controller.js';


const router = Router();

router.post('/', upload.single('file'),addCustomersFromExcel);
router.get('/', getCustomers);
router.get('/allCustomer', getAllCustomer);

router.post('/document', upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'photo', maxCount: 1 }
  ]), uploadCVAndPhoto);

router.get('/document',getAllDocument)



export default router;
