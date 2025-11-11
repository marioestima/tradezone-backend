import { Request, Response } from "express";
import { PrismaUserRepository } from "../repositories/prisma/user-repository";
import { UserService } from "../services/user-service";

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
      const user = await userService.login(req.body);
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
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
