import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel";

const users: User[] = [];

export const registerUser = async (
  username: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: (users.length + 1).toString(),
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  const user = users.find((user) => user.username === username);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    return token;
  }
  return null;
};

export const getUserByToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    return users.find((user) => user.id === decoded.id) || null;
  } catch (error) {
    return null;
  }
};
