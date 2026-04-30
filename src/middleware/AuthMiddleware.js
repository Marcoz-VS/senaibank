// AuthMiddleware.js
import jwt from 'jsonwebtoken';

export function AuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.CHAVE_JWT);
    console.log(decoded);
    req.userId = decoded.id;
    req.user = decoded;
    req.user.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}