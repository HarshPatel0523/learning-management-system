import path from 'path';
import multer from 'multer';

const upload = multer({
    dest : "uploads/",
    limits: { fileSize: 50 * 1024 * 1024 },
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf' && ext !== '.mp4') {
            return cb(new Error(`Unsupported file type! ${ext}`), false);
        }

        cb(null, true);
    },
});

export default upload;