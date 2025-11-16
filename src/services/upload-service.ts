// services/uploadService.ts
import { google } from "googleapis";
import fs from "fs";
import path from "path";

const KEYFILEPATH = "/opt/tradezone/server-account.json";  
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

export async function uploadFile(file: Express.Multer.File): Promise<string> {
  if (!file) throw new Error("No file provided");

  const response = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: ["1yk4ko1bJke82hjTJNeeWwg8Zb3commeU"],  
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    },
  });

  // Tornar arquivo público
  await drive.permissions.create({
    fileId: response.data.id!,
    requestBody: { role: "reader", type: "anyone" },
  });

  // Link direto de download
  const fileUrl = `https://drive.google.com/uc?id=${response.data.id}&export=download`;

  // Apagar arquivo local
  try {
    fs.unlinkSync(file.path);
  } catch (err) {
    console.warn("Não foi possível apagar arquivo local:", err);
  }

  return fileUrl;
}
