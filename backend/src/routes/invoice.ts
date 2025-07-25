import express from 'express';
import { createInvoice, generatePDF } from '../controllers/invoiceController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);
router.post('/', createInvoice);
router.get('/:invoiceId/pdf', generatePDF);

export default router;