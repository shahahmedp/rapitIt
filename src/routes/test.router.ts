import express from 'express';
//import { S3FileUpload } from '../utils';

const router = express.Router();
router.post(
  '/try1',
  //S3FileUpload.any(),
  () => {
    console.log('its working');
  },
  //Validation.decryptAttributeClaims,
  //[check("customerId").isUUID(), check("orderId").isUUID()],
  //ClaimsMiddleware.checkCustomerOrderId,
  //ClaimsController.createClaims
);
export { router };
