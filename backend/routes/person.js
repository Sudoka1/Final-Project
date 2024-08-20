import express from 'express';
const router = express.Router();

import {
  getPersonen,
  addPerson,
  loginWithEmail,
} from '../controllers/personenController.js';

router.route('/').get(getPersonen).post(addPerson);
router.route('/login').post(loginWithEmail);
export default router;
