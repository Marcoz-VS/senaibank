export function RoleMiddleware(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    // Admin pode tudo
    if (req.user.role === "admin") {
      return next();
    }

    // Verifica role específica
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        error: "Acesso negado: você precisa ser " + requiredRole,
      });
    }

    return next();
  };
}