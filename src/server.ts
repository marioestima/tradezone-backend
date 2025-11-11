import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());

// Middleware de fallback para rotas não encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Desculpe, a página que você está procurando não existe.",
  });
});

 

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
