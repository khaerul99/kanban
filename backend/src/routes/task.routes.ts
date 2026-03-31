import { Router } from 'express';
import * as TaskController from '../controllers/task.controller.js'

const router = Router();

router.get('/', TaskController.getTasks);
router.post('/', TaskController.addTask);
router.patch('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;