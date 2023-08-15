import express from 'express';
import clientRoutes from './clients/index.js';
import generalRoutes from './general/index.js';
import salesRoutes from './sales/index.js';
import managementRoutes from './management/index.js';


const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/general', generalRoutes);
router.use('/sales', salesRoutes);
router.use('/management', managementRoutes);



export default router;