import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { uploadFile } from "../services/upload-service";

// Criar storage local temporário do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // pasta temporária no backend
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

// Middleware para enviar arquivo para Google Drive
export const uploadToDrive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Envia para o Google Drive
    const fileUrl = await uploadFile(req.file);

    // Apaga arquivo temporário local
    // opcional: fs.unlinkSync(req.file.path);

    // Salva a URL no request para o controller usar
    req.file.path = fileUrl; // sobrescreve path com URL do Drive
    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
