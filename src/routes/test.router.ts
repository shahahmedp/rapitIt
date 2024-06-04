import express from 'express';

import { amazonS3Upload } from '../tools';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test API
 */

/**
 * @swagger
 * /api/test/try1:
 *   post:
 *     summary: Test S3 upload
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Successful upload
 *       400:
 *         description: Bad request
 */

router.post('/try1', amazonS3Upload.any(), (_req, res) => {
  console.log('its working');
  res.status(200).send('Upload successful');
});

export { router };
