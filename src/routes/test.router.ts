import express from 'express';
import { amazonS3Upload } from '../utils';

const router = express.Router();
router.post(
  '/try1',
  amazonS3Upload.any(),
  () => {
    console.log('its working');
  },
  //Validation.decryptAttributeClaims,
  //[check("customerId").isUUID(), check("orderId").isUUID()],
  //ClaimsMiddleware.checkCustomerOrderId,
  //ClaimsController.createClaims
);
export { router };
