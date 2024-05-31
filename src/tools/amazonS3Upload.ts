import { Request } from 'express';
import { awsS3Bucket } from '../config/config';
import fs from 'fs-extra';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req: Request, _file: Express.Multer.File, cb: (arg0: null, arg1: string) => void) => {
    // Create the uploads folder if it doesn't exist
    const { customerId, orderId } = req.query;
    // Create the uploads folder if it doesn't exist
    const uploadDir = awsS3Bucket;

    // Create folder structure based on customerId/orderNo
    const parentDir = `${uploadDir}/${customerId}`;
    fs.ensureDirSync(parentDir);

    // Create nested directory structure based on customerId/orderNo
    const folderPath = `${parentDir}/${orderId}`;
    fs.ensureDirSync(folderPath);
    cb(null, folderPath);
  },
  filename: (_req: Request, file: { originalname: string }, cb: (arg0: null, arg1: string) => void) => {
    // Rename the file to avoid conflicts
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Initialize multer with the defined storage
export const amazonS3Upload = multer({
  storage: storage,
  fileFilter: (_req, _file, cb) => {
    // Allow all files to be uploaded
    cb(null, true);
  },
});
