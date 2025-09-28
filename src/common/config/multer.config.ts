import { memoryStorage } from 'multer';

export const multerOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file: Express.Multer.File, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};
