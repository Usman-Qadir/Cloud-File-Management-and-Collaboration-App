import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../../uploads"); //* Absolute path to 'uploads'
    cb(null, uploadPath); //* Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); //* Ensures unique filenames
  },
});

const upload = multer({ storage });

export default upload;
