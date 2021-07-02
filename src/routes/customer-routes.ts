import { Router } from 'express';
import { customerGraphqlMiddleware, uploadGraphqlMiddleware } from '../middleware/customer-middleware';

const router = Router();

router.use('/api', [uploadGraphqlMiddleware, customerGraphqlMiddleware]);

module.exports = router;