import { User } from "./Models/UserModel";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
