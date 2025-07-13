import path from 'path';
import multer from 'multer';

const upload = multer({
    dest : "uploads/",
    limits: { 
        fileSize: 100 * 1024 * 1024  // Increased to 100MB for video files
    },
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        // Check if it's a lecture upload
        if (file.fieldname === 'lecture') {
            // Allowed video formats
            const allowedVideoTypes = ['.mp4', '.webm', '.mkv'];
            const ext = path.extname(file.originalname).toLowerCase();
            
            if (!allowedVideoTypes.includes(ext)) {
                return cb(new Error('Only video files (mp4, webm, mkv) are allowed for lectures!'), false);
            }
            
            cb(null, true);
        } else {
            // For other uploads (like thumbnails)
            const allowedTypes = ['.jpg', '.jpeg', '.png'];
            const ext = path.extname(file.originalname).toLowerCase();
            
            if (!allowedTypes.includes(ext)) {
                return cb(new Error('Only images (jpg, jpeg, png) are allowed!'), false);
            }
            
            cb(null, true);
        }
    },
});

export default upload;