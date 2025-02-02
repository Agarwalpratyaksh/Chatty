// src/custom.d.ts
import { User } from './models/User'; // Replace with your actual User model

declare global {
  namespace Express {
    interface Request {
      user?: User; // 'user' can be of type 'User' or undefined
    }
  }
}
