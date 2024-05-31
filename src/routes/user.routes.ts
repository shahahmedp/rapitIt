import { Request, Response } from 'express';
import express from 'express';
import { AuthJwt } from '../../example/middleware/authjwt';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TestWithAuth
 *   description: Test API with JWT Authentication
 */

/**
 * @swagger
 * /api/test/all:
 *   post:
 *     summary: Test endpoint with token authentication
 *     tags: [TestWithAuth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token authentication successful
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  '/api/test/all', 
  [AuthJwt.VerifyToken], 
  (_req: Request, res: Response) => {
    res.send('Token authentication successful');
  }
);

export { router };
