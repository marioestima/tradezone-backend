import { CreateUserDto, UpdateUserDto, LoginUserDto } from "../dtos/UserDTOs";
import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import bcrypt from "bcryptjs";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    // Verifica se já existe um usuário com o mesmo email
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Ja esta registrado");
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Cria o novo usuário
    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.userRepository.update(id, data);
  }

  async login(data: LoginUserDto): Promise<User | null> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) return null;

    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    if (id) {
      return this.userRepository.findById(id);
    }
    return null;
  }
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
