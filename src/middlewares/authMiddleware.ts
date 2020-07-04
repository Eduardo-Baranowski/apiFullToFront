import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const { authorization: authHeader } = req.headers;

  console.log(authHeader);

  if (!authHeader) {
    return res.status(400).json({ message: "JST token is missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload; // casting de variavel

    // Dizendo quem é o usuário autenticado
    req.user = {
      id: sub,
    };

    console.log(req.body);

    return next();
  } catch {
    return res.status(400).json({ message: "Invalid JWT token" });
  }
}
