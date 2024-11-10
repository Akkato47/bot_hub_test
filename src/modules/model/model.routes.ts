import { isAuthenticated } from '@/middleware/auth.middleware';
import { Router } from 'express';
import * as modelController from './model.controller';
import { isAdmin } from '@/middleware/role.middleware';

const router = Router();

router.get(
  '/types/all',
  isAuthenticated,
  isAdmin,
  modelController.getChatModels
);
router.get('/all', isAuthenticated, modelController.getModels);
router.get('/one/:modelUid', isAuthenticated, modelController.getModelByUid);

router.post('/create', isAuthenticated, isAdmin, modelController.createModel);

router.put(
  '/update',
  isAuthenticated,
  isAdmin,
  modelController.updateModelData
);

router.delete(
  '/delete/:modelUid',
  isAuthenticated,
  isAdmin,
  modelController.deleteModel
);

export default router;
