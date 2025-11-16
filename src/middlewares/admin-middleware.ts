import { Request, Response, NextFunction } from "express";

// Middleware que verifica se o usuário é admin
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRole = req.user?.role; // assumindo que authMiddleware já colocou req.user

  if (!userRole || userRole !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
