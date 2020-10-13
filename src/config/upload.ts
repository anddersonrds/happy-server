import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadsPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  uploadsFolder: uploadsPath,
  storage: multer.diskStorage({
    destination: uploadsPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
