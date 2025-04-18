const multer = require('multer');

// Define the storage location and filename format
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/movies'); // Folder where images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Use timestamp to avoid name conflicts
    }
});

// Multer setup
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(file.mimetype);
        const mimetype = filetypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        }
        return cb('Error: Images Only!');
    }
});

module.exports = upload;
