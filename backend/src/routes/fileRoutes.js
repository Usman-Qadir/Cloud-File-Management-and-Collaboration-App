import express from "express";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

router.post('/uploads', upload.array("file"), (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    res.status(200).json({
      success: true,
      files: files.map((file) => ({
        fileName: file.originalname,
        storedName: file.filename,
        path: file.path,
        size: file.size,
      })),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
