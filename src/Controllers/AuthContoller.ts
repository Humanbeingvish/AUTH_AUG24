import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../Service/AuthService";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Registeration Failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await authenticateUser(username, password);
    if (token) {
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invaild Credentials " });
    }
  } catch (error) {
    res.status(500).json({ message: "Authenticate Failed" });
  }
};
