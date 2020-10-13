import { Router } from 'express';

import OrphanagesController from '@modules/orphanages/infra/http/controllers/OrphanagesController';

const orphanagesRouter = Router();
const orphanagesController = new OrphanagesController();

orphanagesRouter.get('/', orphanagesController.index);
orphanagesRouter.post('/', orphanagesController.create);

export default orphanagesRouter;
