import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';

import usersRoutes from './usersRoutes';
import sessionRoutes from './sessionRoutes';
import productsRoutes from './productsRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/session', sessionRoutes);

routes.use(authMiddleware);
routes.use('/products', productsRoutes);

export default routes;
