import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/'); // Destination folder where uploaded files will be stored
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.xlsx' && ext !== '.xls') {
      return cb(new Error('Only Excel files are allowed'));
    }
    cb(null, true);
  }
});

export default upload;
