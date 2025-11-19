 import { Request, Response } from "express";
import { PrismaUserRepository } from "../repositories/prisma/user-repository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserService } from "../services/user-service";
dotenv.config();

const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.login({ email, password });
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      // SIGN WITH userId to match middleware expectation
      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "2d" }
      );

      res.json({ user, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const id = req.user?.id;

      if (!id) {
        return res
          .status(401)
          .json({ message: "Invalid token payload: missing userId" });
      }

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async getById(req: Request, res: Response) {
    const user = await userService.getUserById(Number(req.params.id));
    res.json(user);
  }
}
