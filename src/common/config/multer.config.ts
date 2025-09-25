import { diskStorage } from 'multer'
import { extname } from 'path'

export const multerOptions = {
    storage: diskStorage({
        destination: './images',
        filename: (request, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const uploadedFileName = uniqueSuffix + extname(file.originalname)
            callback(null, uploadedFileName)
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file: Express.Multer.File, callback: Function) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }
}