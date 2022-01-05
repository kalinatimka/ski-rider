import multer from 'multer';

function getDiskStorage(destination: string) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            cb(null, String(Date.now()) + file.originalname);
        }
    });
}

export default function multerMW(destination: string) {
    const storage = getDiskStorage(destination);
    return multer({ storage });
}
